import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const storedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
        setComplaints(storedComplaints);
    }, []);

    return (
        <div>
            <Navbar />
            <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900  to-gray-800 text-white flex justify-center items-center">
                <div className="w-120 max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-center mb-4">User Complaints</h2>
                    {complaints.length === 0 ? (
                        <p className="text-center">No complaints submitted yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {complaints.map((complaint, index) => (
                                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                    <h3 className="text-lg font-bold">{complaint.problemName}</h3>
                                    <p><strong>Description:</strong> {complaint.description}</p>
                                    <p><strong>Location:</strong> {complaint.location}</p>
                                    <p><strong>Time:</strong> {complaint.time}</p>
                                    {complaint.image && (
                                        <img src={complaint.image} alt="Complaint" className="w-full h-40 object-cover mt-2 rounded-lg" />
                                    )}
                                    <p className="mt-2">
                                        <strong>Status:</strong> 
                                        <span className={`text-${complaint.status === 'Resolved' ? 'bg-green-400' : complaint.status === 'In Progress' ? 'bg-yellow-400' : 'bg-red-400'}-500 font-bold ml-2`}>
                                            {complaint.status || "Pending"}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComplaintList;
