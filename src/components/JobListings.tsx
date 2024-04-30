import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

interface Job {
  id: number;
  job_title: string;
  company_name: string;
  location: string;
  work_format: string;
  remote_work_availability: string;
  application_deadline: string;
  application_date: string;
  salary_range: string;
  required_skills: string[];
  benefits: string[];
  application_status: string;
  application_link: string;
  additional_details: any; // This will be displayed as a JSON string
}

const applicationStatuses = [
  "Applied",
  "Under Review",
  "Screening/Checks",
  "Interviewing",
  "Offer Extended",
  "Offer Accepted",
  "Offer Declined",
  "Rejected",
  "Not Selected",
]

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Applied":
      return "bg-blue-100 text-blue-800"; // Soft blue, indicating the start
    case "Under Review":
      return "bg-yellow-100 text-yellow-800"; // Light yellow, for consideration
    case "Screening/Checks":
      return "bg-purple-100 text-purple-800"; // Pale purple, for process
    case "Interviewing":
      return "bg-green-100 text-green-800"; // Soft green, active engagement
    case "Offer Extended":
      return "bg-indigo-100 text-indigo-800"; // Mild indigo, positive action
    case "Offer Accepted":
      return "bg-teal-100 text-teal-800"; // Gentle teal, success
    case "Offer Declined":
      return "bg-orange-100 text-orange-800"; // Light orange, decision not to proceed
    case "Rejected":
      return "bg-red-100 text-red-800"; // Soft red, stop
    case "Not Selected":
      return "bg-gray-100 text-gray-800"; // Neutral gray, for non-selection
    default:
      return "bg-white text-black"; // Default, for any other or undefined status
  }
};


const JobListings: React.FC<{ refetchIndicator: number, triggerRefetch: () => void }> = ({ refetchIndicator, triggerRefetch }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) { // Ensure there's a user id to append as a query parameter
        axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/jobs`, {
            params: { userId: user.id }
        })
        .then(response => {
          console.log("RESPONSE: ", response.data);
            const sortedJobs = response.data.sort((a: { application_date: string | number | Date; id: number; }, b: { application_date: string | number | Date; id: number; }) => {
                const dateComparison = new Date(b.application_date).getTime() - new Date(a.application_date).getTime();
                if (dateComparison !== 0) {
                    return dateComparison;
                }
                return b.id - a.id;
            });
            setJobs(sortedJobs);
        })
        .catch(error => console.error('Error fetching jobs:', error));
    }
}, [refetchIndicator, user?.id]); 


  const updateJobStatus = async (jobId: number, newStatus: string) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_ENDPOINT}/jobs/${jobId}/status`, { status: newStatus });
      triggerRefetch(); // Optionally trigger a re-fetch to update the job listings
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  function formatDate(dateStr: string | null): string {
    if (!dateStr) return 'N/A';

    // Split the date string into its components
    const parts = dateStr.split('-').map(part => parseInt(part, 10));

    // Create a new date object using the parts. Note that months are 0-indexed.
    const date = new Date(parts[0], parts[1] - 1, parts[2]);

    // Use toLocaleDateString to format the date in a user-friendly way.
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }


  return (
    <div className='flex flex-col mx-12'>
      <h2 className="text-xl font-semibold my-4">My Job Applications</h2>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="table-wrp block max-h-[50vh]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-700 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Work Format</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Work Mode</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Application Deadline</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Date Applied</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Salary Range</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Required Skills</th>{/* optional for later */}
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Benefits</th>{/* optional for later */}
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Additional Details</th>*/}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-left max-w-72 overflow-hidden overflow-ellipsis" title={job.job_title}>
                    {job.job_title ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">
                    <select
                      value={job.application_status}
                      onChange={(e) => updateJobStatus(job.id, e.target.value)}
                      className={`block min-w-full py-2 px-3 rounded leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${getStatusStyle(job.application_status)}`}
                    >
                      {applicationStatuses.map((status) => (
                        <option key={status} value={status} className={`${getStatusStyle(status)}`}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.company_name ?? 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.location ?? 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.work_format ?? 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.remote_work_availability ?? 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.application_deadline ? formatDate(job.application_deadline) : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.application_date ? formatDate(job.application_date) : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left max-w-52 overflow-hidden overflow-ellipsis" title={job.salary_range}>
                    {job.salary_range ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left max-w-72 overflow-hidden overflow-ellipsis" title={job.required_skills?.join(', ')}>
                    {job.required_skills?.join(', ') ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left max-w-72 overflow-hidden overflow-ellipsis" title={job.benefits?.join(', ')}>
                    {job.benefits?.join(', ') ?? 'N/A'}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{job.additional_details ? JSON.stringify(job.additional_details) : 'N/A'}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobListings;
