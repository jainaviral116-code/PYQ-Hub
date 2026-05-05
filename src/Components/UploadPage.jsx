import { useState } from "react";
import service from "../Appwrite/services";

const UploadPage = ( { onUploadSuccess } ) => {
    const [title , setTitle] = useState('');
    const [subject , setSubject] = useState('');
    const [semester , setSemester] = useState('');
    const [file , setFile] = useState(null);

    const handler = async (e)=>{
        e.preventDefault();
        try {
            const fileUploaded = await service.uploadFile(file);
            await service.createPaper(
                {
                title,
                subject,
                semester,
                fileID:fileUploaded.$id
                }
            );
            onUploadSuccess();
            alert("File Successfully Uploaded!")
            
        } catch (error) {
            console.error("Upload UI :: Error" , error);
        }
        
    }
//note : when you make the parent container as flex , then the children will shrink to fit the size of their content
    return (
        <div className="flex justify-center ">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Upload Paper</h2>
        <form onSubmit={handler} className="space-y-3">
        <label for="title" className="block text-sm font-medium text-gray-600">Title:</label>
        <input
            id="title"
            className="my-input"
            type="text"
            placeholder="title"
            onChange={(e)=>{setTitle(e.target.value)}}
            required
        />
        <br/>
        <label for="subject" className="block text-sm font-medium text-gray-600">Subject:</label>
        <input
            id="subject"
            className="my-input"
            type="text"
            placeholder="subject"
            onChange={(e)=>{setSubject(e.target.value)}}
            required
        />
        <br/>
        <label for="semester" className="block text-sm font-medium text-gray-600">Semester:</label>
        <input
            id="semester"
            className="my-input"
            type="text"
            placeholder="semester"
            onChange={(e)=>{setSemester(e.target.value)}}
            required
        />
        <br/>
        <label for="file" className="block text-sm font-medium text-gray-600">File:</label>
        <input
            id="file"
            //border-0  to remove the default styling
            className="block w-full text-gray-500 text-sm
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:bg-blue-100 file:text-blue-700
                       hover:file:bg-blue-200"
            type="file"
            onChange={(e)=>{setFile(e.target.files[0])}} // because this will store an array of all the uploaded files
            required
        />
        <br/>
        <button type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition"
                >Upload</button>
        </form>
        </div>
        </div>
    );
}

export default UploadPage;