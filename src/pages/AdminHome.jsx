import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const AdminHome = () => {
    const [complaints, setComplaints] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const storedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
        setComplaints(storedComplaints);
    }, []);

    const updateStatus = (index, newStatus) => {
        const updatedComplaints = complaints.map((complaint, i) =>
            i === index ? { ...complaint, status: newStatus } : complaint
        );

        setComplaints(updatedComplaints);
        localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    };

    const deleteComplaint = (index) => {
        const updatedComplaints = complaints.filter((_, i) => i !== index);
        setComplaints(updatedComplaints);
        localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    };

    return (
        <div>
            <Navbar />
            <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white flex justify-center items-center">
                <div className="w-120 max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">Admin Dashboard</h2>
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
                                    
                                    {/* Clickable Image */}
                                    {complaint.image && (
                                        <img
                                            src={complaint.image}
                                            alt="Complaint"
                                            className="w-20 h-20 object-cover mt-2 rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                                            onClick={() => setSelectedImage(complaint.image)}
                                        />
                                    )}

                                    <p className="mt-2"><strong>Status:</strong> 
                                        <span className={`text-${complaint.status === 'Resolved' ? 'green' : complaint.status === 'In Progress' ? 'yellow' : 'red'}-500 font-bold`}>
                                            {complaint.status || "Pending"}
                                        </span>
                                    </p>
                                    
                                    <div className="mt-3">
                                        <button className="bg-red-500 px-3 py-1 rounded-md mx-1" onClick={() => updateStatus(index, "Pending")}>Pending</button>
                                        <button className="bg-yellow-500 px-3 py-1 rounded-md mx-1" onClick={() => updateStatus(index, "In Progress")}>In Progress</button>
                                        <button className="bg-green-500 px-3 py-1 rounded-md mx-1" onClick={() => updateStatus(index, "Resolved")}>Resolved</button>
                                        <button className="bg-gray-700 px-3 py-1 rounded-md mx-1" onClick={() => deleteComplaint(index)}>🗑 Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">
                    <div className="relative">
                        <img src={selectedImage} alt="Complaint" className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg" />
                        <button 
                            className="absolute top-2 right-2 bg-gray-900 text-white px-3 py-1 rounded-full text-xl" 
                            onClick={() => setSelectedImage(null)}
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminHome;
