import { useEffect, useState } from "react";
import service from "../Appwrite/services";

const BrowsePage = ( { refresh , toggleRefresh } ) => { // destructure props object to get refresh variable , i will use refresh variable to connect BrowsePage with App
  const [papers, setPapers] = useState([]);
  const [filter , setFilter] = useState("");
  const [allPapers , setAllPapers] = useState([]);
  const [loading , setLoading] = useState(true);

  useEffect(()=>{// to fetch all available papers
    service.getPapers().then((res) => setAllPapers(res.documents));
  } , [refresh]);

  const allAvailableSubjects = [...new Set(allPapers.map(p=>p.subject))];
 

  useEffect(() => {
    setLoading(true);
    service.getPapers(filter).then((res) => setPapers(res.documents)).finally(()=>setLoading(false)); // listDocuments return a json in which all rows are stored as an array of row json inside documents key
    
  }, [refresh , filter]);

  const deleteFile = (rowId)=>{
    setLoading(true);
    service.deletePaper(rowId).finally(()=>{
        setLoading(false);
        toggleRefresh();
        
    }
    );
  }

  return (
    <>

        <div className="flex justify-between items-center mb-4">
  <h2 className="text-xl font-bold text-gray-800">Browse Papers</h2>

  
        <select value={filter} onChange={(e)=>setFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            >
            <option value="">All Subjects</option>

            {allAvailableSubjects.map((sub , index)=>(
                <option key={sub} value={sub}>
                    {sub}
            </option>
        ))}

        </select>

        </div>



        {loading&&<p>Loading Papers...</p>}
        {!loading&&papers.length===0&&<p>No papers to show</p>}
        <div grid md:grid-cols-2 gap-4>
        {papers.map((paper)=>(
            <div key={paper.$id} className="group bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-lg transition">
                
                <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">{paper.subject}</span>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600">{paper.title}</h3>
                <p className="text-sm text-gray-500 mt-1"><span>📅</span> Semester: {paper.semester}</p>


                <div className="flex justify-between items-center mt-3">
                <a  className="text-blue-600 text-sm font-semibold hover:underline"
                    href={service.getFilePreview(paper.fileID)}
                    target="_blank"
                    rel="noopener noreferrer"  // to not allow the new tab to access windows.opener and stop potential attacks
                >
                    Open Pdf
                </a>
                <br/>
                <button className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                onClick={()=>{deleteFile(paper.$id)}}>Delete</button>
                </div>
            </div>
        )
        )
    }
    
        </div>
    </>
  );
};

export default BrowsePage;
