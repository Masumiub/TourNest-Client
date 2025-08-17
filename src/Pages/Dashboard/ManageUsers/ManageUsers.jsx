import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import Select from 'react-select';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const roleOptions = [
  { value: '', label: 'All Roles' },
  { value: 'user', label: 'Tourist' },
  { value: 'guide', label: 'Tour Guide' },
  { value: 'admin', label: 'Admin' }
];

const pageSizes = [10, 20, 50];

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Fetch total count
  const { data: countData = { count: 0 } } = useQuery({
    queryKey: ['usersCount', selectedRole.value],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/count', {
        params: { role: selectedRole.value }
      });
      return res.data;
    },
    keepPreviousData: true
  });

  const totalPages = Math.ceil(countData.count / limit);

  // Fetch paginated users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', search, selectedRole.value, currentPage, limit],
    queryFn: async () => {
      const res = await axiosSecure.get('/users', {
        params: {
          search,
          role: selectedRole.value,
          limit,
          skip: (currentPage - 1) * limit
        }
      });
      return res.data;
    },
    keepPreviousData: true
  });

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


  // console.log('User Count:', countData.count);
  // console.log('Limit:', limit);
  // console.log('Total Pages:', totalPages);

  return (
    <div className="p-6 mt-10">
      <h2 className="text-4xl font-bold mb-6">Manage Users</h2>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="input input-bordered w-full md:w-1/2"
        />
        <div className="w-full md:w-1/3">
          <Select
            options={roleOptions}
            value={selectedRole}
            onChange={(option) => {
              setSelectedRole(option);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id}>
                    <td>{(currentPage - 1) * limit + idx + 1}</td>
                    <td><img src={user.photoURL} className="w-12 h-12 rounded-full object-cover" /></td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="capitalize">{user.role || 'user'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-10 flex justify-center flex-wrap gap-4 items-center">
            <button onClick={handlePrev} disabled={currentPage === 1} className="btn btn-outline">
              Previous
            </button>

            <div className="join">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`join-item btn ${currentPage === num ? 'btn-primary' : ''}`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button onClick={handleNext} disabled={currentPage === totalPages} className="btn btn-outline">
              Next
            </button>

            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="select select-bordered w-30"
            >
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  View {size} Users Per Page
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;
