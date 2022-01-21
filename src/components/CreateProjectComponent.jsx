import { useState } from 'react';
import { create } from 'ipfs-http-client';

function CreateProjectComponent(props) {

    const [formInput, setFormInput] = useState({
        category: '',
        projectName: '',
        description: '',
        creatorName: '',
        image: '',
        link: '',
        goal: '',
        duration: '',
        refundPolicy: ''
    });

    const [inputImage, setInputImage] = useState('');

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        formInput[name] = value;
        setFormInput(formInput)
    }

    async function handleImageChange(e) {
        // read the file content on change
        const file = e.target.files[0];
        try {
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = () => {
                console.log('File read complete');
                setInputImage(reader.result);
            }
        } catch(error) {
            alert('Error reading file: ' + error);
            console.log(error);
        }
    }

    async function submitProjectData(e) {
        const client = create({ host: "ipfs.infura.io", port: 5001, protocol: 'https' });
        e.preventDefault();    
        if (inputImage) {
            try {
                const added = await client.add(inputImage);
                console.log(added.path);
                formInput['image'] = `ipfs.io/ipfs/${added.path}`;
            } catch(error) {
                alert('Uploading file error: ' + error);
                console.log(error); 
            }
        }
        console.log(formInput);
    }

    return (
        // onSubmit function to do further operation with form data --> not defined yet
        <div className="create-form">
            <form method="post" onSubmit={submitProjectData}>
                <h1>Create Project</h1>
                <label>Category</label>
                <select name = "category" required onChange={handleChange}>
                    <option value="" selected disabled hidden>Select category</option>
                    <option value="design and tech">Design and Tech</option>
                    <option value="film">Film</option>
                    <option value="arts">Arts</option>
                    <option value="games">Games</option>
                </select>
                <label>Project Name</label>
                <input name="projectName" placeholder="Enter the project name" required onChange={handleChange}/>
                <label>Project Description</label>
                <textarea name="description" placeholder="Enter project description" cols="50" rows="5" required  onChange={handleChange}/>
                <label>Creator Name</label>
                <input name="creatorName" placeholder="Enter Creator Name" required onChange={handleChange}/>
                <label>Upload Project Image</label>
                <input type="file" name="image" accept="image/*" onChange={handleImageChange}/>
                <label>Project Link</label>
                <input type="url" name="link" placeholder="Enter link to the project" onChange={handleChange}/>
                <label>Funding Goal (AVAX)</label>
                <input type="number" step="0.00001" name="goal" placeholder="Enter the funding goal" min="0.00001" required onChange={handleChange}/>
                <label>Duration (Days)</label>
                <input type="number" name="duration" placeholder="Enter the duration for the funding" min="1" required onChange={handleChange}/>
                <label>Refund policy</label>
                <select name="refundPolicy" required onChange={handleChange}>
                    <option value="" selected disabled hidden>Select Refund type</option>
                    <option value="refundable">Refundable</option>
                    <option value="non-refundable">Non-Refundable</option>
                </select>
                <input type="submit" className="submitButton" value="Submit"/>
            </form>
        </div>
    );
}

export default CreateProjectComponent;