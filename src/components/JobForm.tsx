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
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJobDesc(e.target.value);
        const target = e.target;
        const maxHeight = 300; // Maximum height in pixels

        // Reset height to recalculate
        target.style.height = 'inherit';

        // Calculate the scroll height and limit it by maxHeight
        const calculatedHeight = Math.min(target.scrollHeight, maxHeight);

        // Set the height to the calculated height (or maxHeight if it's exceeded)
        target.style.height = `${calculatedHeight}px`;

        // Enable or disable scrolling based on whether the content exceeds maxHeight
        target.style.overflowY = target.scrollHeight > maxHeight ? 'auto' : 'hidden';
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/insert_job`, {
                job_desc_input: jobDesc,
                current_date: new Date().toISOString()
            });
            setResponse(response.data);
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
                        ref={textAreaRef}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                        value={jobDesc}
                        placeholder='Paste job description here to generate a job application entry...'
                        onChange={handleInput}
                        style={{ minHeight: '100px' }}  // Initial height
                    />
                </div>
                <button type="submit" className="text-white bg-indigo-600 hover:bg-indigo-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading || jobDesc.trim().length === 0}>
                    {loading ? <Spinner /> : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default JobForm;
