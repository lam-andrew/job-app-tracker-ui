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

const JobListings: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/jobs`)
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  function formatDate(dateStr: string | null): string {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US');
  }


  return (
    <div className='flex flex-col m-12'>
      <h2 className="text-xl font-semibold my-4">Job Listings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Format</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remote Work Avail</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">App Deadline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary Range</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Skills</th>{/* optional for later */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benefits</th>{/* optional for later */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Additional Details</th>{/* optional for later */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id}>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{job.additional_details ? JSON.stringify(job.additional_details) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobListings;
