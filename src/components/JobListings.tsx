import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const JobListings: React.FC<{ refetchIndicator: number }> = ({ refetchIndicator }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/jobs`)
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, [refetchIndicator]);

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
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Work Format</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Work Mode</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Application Deadline</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Date Applied</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Salary Range</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Required Skills</th>{/* optional for later */}
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Benefits</th>{/* optional for later */}
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Additional Details</th>*/}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.job_title ?? 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.company_name ?? 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.location ?? 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.work_format ?? 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.remote_work_availability ?? 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.application_deadline ? formatDate(job.application_deadline) : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.application_date ? formatDate(job.application_date) : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.salary_range ?? 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.application_status ?? 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.required_skills?.join(', ') ?? 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{job.benefits?.join(', ') ?? 'N/A'}</td>
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
