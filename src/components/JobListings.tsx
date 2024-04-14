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

  // Function to format the date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

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
                <td className="px-6 py-4 whitespace-nowrap">{job.job_title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.company_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.work_format}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.remote_work_availability}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(job.application_deadline)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(job.application_date)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.salary_range}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.application_status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.required_skills.join(', ')}</td>{/* optional for later */}
                <td className="px-6 py-4 whitespace-nowrap">{job.benefits.join(', ')}</td>{/* optional for later */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{/* optional for later */}
                  {JSON.stringify(job.additional_details, null, 2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobListings;
