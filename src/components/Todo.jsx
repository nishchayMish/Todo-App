import React, { useState } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegThumbsUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Todo = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [mainTask, setMainTask] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDesc, setEditDesc] = useState('');

    function submitHandler(e) {
        e.preventDefault();
        if (title.length > 0) {
            setMainTask([...mainTask, { title, desc }]);
            setTitle('');
            setDesc('');
        } else {
            alert('Title cannot be empty');
        }
    }

    function deleteHandler(i) {
        let copyTask = [...mainTask];
        copyTask.splice(i, 1);
        setMainTask(copyTask);
    }

    function startEditHandler(index, title, desc) {
        setEditIndex(index);
        setEditTitle(title);
        setEditDesc(desc);
    }

    function updateHandler(index) {
        let copyTask = [...mainTask];
        copyTask[index] = { title: editTitle, desc: editDesc };
        setMainTask(copyTask);
        setEditIndex(null);
    }

    function cancelEditHandler() {
        setEditIndex(null);
    }

    let renderTask = <h1 className='text-red-500 text-center text-2xl'>No Task Available</h1>;

    if (mainTask.length > 0) {
        renderTask = mainTask.map((task, index) => {
            const isEditing = editIndex === index;

            return (
                <div key={index} className='task-item gap-5 bg-gray-700 shadow-lg mt-5 rounded-lg p-2 flex flex-col md:flex-row justify-between items-center transition-all duration-300'>
                    {
                        isEditing ? 
                        <div className='mb-3 mt-3 flex flex-col gap-2 w-full sm:flex'>
                            <input
                                type='text'
                                placeholder='Task Title'
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className='p-2 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1'
                            />
                            <input
                                type='text'
                                placeholder='Task Description'
                                value={editDesc}
                                onChange={(e) => setEditDesc(e.target.value)}
                                className='p-2 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1'
                            />
                        </div> 
                        : 
                        <div className='task-content flex-1 overflow-hidden'>
                            <h1 className='text-gray-100 text-xl font-semibold truncate'>{task.title}</h1>
                            <p className='text-gray-300 truncate'>{task.desc}</p>
                        </div>
                    }
                    <div className='flex gap-4 items-center mt-2 md:mt-0'>
                        <div id='deleteBtn'
                            onClick={() => deleteHandler(index)}
                            className='bg-red-600 p-1 rounded hover:bg-red-500 cursor-pointer transition duration-300'
                        >
                            <MdOutlineDeleteOutline style={{ color: 'white' }} />
                        </div>

                        {
                            isEditing ?
                            <>
                                <div id='updateBtn'
                                    onClick={() => updateHandler(index)}
                                    className='bg-green-600 p-1 rounded hover:bg-green-500 cursor-pointer transition duration-300'>
                                    <FaRegThumbsUp style={{ color: 'white' }} />
                                </div>
                                <div id='cancelBtn'
                                    onClick={cancelEditHandler}
                                    className='bg-gray-600 p-1 rounded hover:bg-gray-500 cursor-pointer transition duration-300'>
                                    <IoClose style={{ color: 'white' }} />
                                </div>
                            </>
                            :
                            <div id='editBtn'
                                onClick={() => startEditHandler(index, task.title, task.desc)}
                                className='bg-blue-600 p-1 rounded hover:bg-blue-500 cursor-pointer transition duration-300'>
                                <FaRegEdit style={{ color: 'white' }} />
                            </div>
                        }
                    </div>
                </div>
            );
        });
    }

    return (
        <div className='p-4'>
            <form className='flex flex-col gap-4'>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type='text'
                    placeholder='Task Title'
                    className='p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder='Task Description'
                    className='p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                />
                <button
                    onClick={submitHandler}
                    className='p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300'
                >
                    Add Task
                </button>
            </form>
            <br />
            <hr className='border-gray-600' />
            <br />
            <div className='task-list'>{renderTask}</div>
        </div>
    );
};

export default Todo;