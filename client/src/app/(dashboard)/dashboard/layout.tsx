import AddTodo from '@/components/AddTodo';
import Navbar from '@/components/Navbar';
import * as React from 'react';
import { ReactNode } from "react";

interface ILayoutProps {
    children: ReactNode
}

const page = ({ children }: ILayoutProps) => {

    return <main className='h-screen w-full md:w-screen bg-indigo-100 flex items-center justify-center'>
        <div className="min-h-[85vh] flex flex-col min-w-[50vw] max-w-full bg-white rounded-xl shadow-2xl border border-indigo-200">
            <div>
                <Navbar />
            </div>
            <div className='py-2 md:py-6 px-2 md:px-8 flex-1'>
                <AddTodo/>
                {children}
            </div>
        </div>
    </main>
};

export default page;
