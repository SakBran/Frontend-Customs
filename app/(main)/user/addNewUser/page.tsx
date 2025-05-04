import React from 'react';

const page = () => {
    return (
        <div className="col-12 xl:col-12">
            <div className="card">
                <div className="overflow-hidden">
                    <div className="flex flex-column align-items-center justify-content-center min-h-screen">
                        <img src="/layout/images/spinning-dots.svg" alt="Loading spinner" className="mb-5 w-6rem flex-shrink-0" />
                        <h1 className="text-900 font-bold text-5xl mb-2">Loading...</h1>
                        <div className="text-600">Please wait while we load the content for you.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
