import { motion } from 'framer-motion';
import { Search, UserRoundPlus } from 'lucide-react';
import { useState } from 'react';
import { RIDER_DETAILS, TABLE_ITEMS } from '../data/Riders.data';
import AddRider from './AddRider';

const Riders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRiders, setFilteredRiders] = useState(RIDER_DETAILS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = RIDER_DETAILS.filter(
      (rider) =>
        rider.firstName.toLowerCase().includes(term) ||
        rider.email.toLowerCase().includes(term)
    );

    setFilteredRiders(filtered);
  };

  return (
    <motion.div
      className="mx-10 my-10 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <AddRider isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">All Riders</h2>
        <div className="relative flex items-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-400 text-white py-2 pl-8 pr-4 rounded-lg"
          >
            Add New Rider
          </button>
          <UserRoundPlus
            className="absolute text-white left-2 top-2.5"
            size={18}
          />

          <div className="relative">
            <input
              type="text"
              placeholder="Search riders..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr className="className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              {TABLE_ITEMS.map((item) => (
                <th
                  key={item.field}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredRiders.map((rider) => (
              <motion.tr
                key={rider.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {rider.firstName.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-100">
                        {rider.firstName}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {rider.middleName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {rider.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {rider.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {rider.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {rider.dateOfBirth}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {rider.gender}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default Riders;