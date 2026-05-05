import {Client , ID , Databases , Storage , Query} from 'appwrite'
import conf from '../config/conf'

class Service {
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteprojectid)


        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }


    async uploadFile(file){
        try {
            // i will be returning file object so i can further use uploadedfile.id to save it in database
            return await this.storage.createFile(
                conf.appwritestorageid,
                ID.unique(), // fileID
                file
            );
        } catch (error) {
            console.error("Upload :: error" , error);
            throw error;
        }
    }

    async createPaper({title , subject , semester , fileID}){
        try {
            return await this.databases.createDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                ID.unique() , //row id
                {
                    title,
                    subject,
                    semester,
                    fileID

                }
            );
        } catch (error) {
            console.error("Appwrite Service :: dataBase Creation :: error" , error);
            throw error;
        }
    }


    async getPapers(subject){

        try {
            if(subject){
                return await this.databases.listDocuments(
                    conf.appwritedatabaseid,
                    conf.appwritecollectionid,
                    [Query.equal('subject' , subject)]

                );

            }else{
                return await this.databases.listDocuments(
                    conf.appwritedatabaseid,
                    conf.appwritecollectionid
                );

            }
            
        } catch (error) {
            console.error("Appwrite Services :: getPapers :: Error" , error);
            throw error;
        }
    }


    getFilePreview(fileId){
        return this.storage.getFileView(
            conf.appwritestorageid,
            fileId
        );
    }


    async getPaper(rowId){
        try {
            return await this.databases.getDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                rowId
            );
        } catch (error) {
            console.error("Appwrite Services :: Fetch Row :: Error" , error);
            throw error;
        }
    }


    async deletePaper(rowId){
        try {
            const row = await this.getPaper(rowId);
                await this.storage.deleteFile(
                    conf.appwritestorageid,
                    row.fileID
                );
            await this.databases.deleteDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                rowId
            );

            return true;
            
        } catch (error) {
            console.error("Appwrite Services :: delete file :: Error" , error);
            throw error;
            
        }

    }
}

const service = new Service();
export default service;