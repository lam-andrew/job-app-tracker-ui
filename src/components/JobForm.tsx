import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

type ApplicationStatus = 
    | 'Applied'
    | 'Under Review'
    | 'Interview Scheduled'
    | 'Interview Completed'
    | 'Offer Extended'
    | 'Offer Accepted'
    | 'Offer Declined'
    | 'Rejected'
    | 'Withdrawn'
    | 'On Hold';

interface JobJsonResponse {
    JobTitle: string | null;
    CompanyName: string | null;
    Location: string | null;
    WorkFormat: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship' | null;
    RemoteWorkAvailability: 'Onsite' | 'Remote' | 'Hybrid' | null;
    ApplicationDeadline: string | null; // Assuming ISO date format or null
    ApplicationDate: string; // Assuming ISO date format
    SalaryRange: string | null;
    RequiredSkills: string[] | null;
    Benefits: string[] | null;
    ApplicationStatus: ApplicationStatus;
    AdditionalDetails: {
        ApplicationLink: string | null;
        [key: string]: any; // For any additional, unexpected fields
    };
}

interface ApiResponse {
    message: string;
    job_id: string;
    job_json: JobJsonResponse;
}

const JobForm: React.FC<{ triggerRefetch: () => void }> = ({ triggerRefetch }) => {
    const [jobDesc, setJobDesc] = useState<string>('');
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false); 

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/insert_job`, {
                job_desc_input: jobDesc,
                current_date: new Date().toISOString()
            });
            setResponse(response.data)
            triggerRefetch();
        } catch (error) {
            console.error("Error sending job description:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto pt-28 px-12">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-4" htmlFor="jobDescription">
                        Job Description:
                    </label>
                    <textarea
                        id="jobDescription"
                        className="shadow appearance-none border rounded max-h-96 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                    />
                </div>
                <button type="submit" className="text-white bg-indigo-600 hover:bg-indigo-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading}>
                    {loading ? <Spinner /> : 'Submit'}
                </button>
            </form>

            {response && (
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-hidden">
                    <h2 className="text-xl mb-2">Response:</h2>
                    <p className="mb-2"><strong>Message:</strong> {response.message}</p>
                    <p><strong>Job ID:</strong> {response.job_id}</p>
                    <div className="overflow-auto">
                        <p className="mb-2"><strong>Job JSON:</strong></p>
                        <pre className="bg-gray-100 rounded p-4 whitespace-pre-wrap">
                            {JSON.stringify(response.job_json, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobForm;
