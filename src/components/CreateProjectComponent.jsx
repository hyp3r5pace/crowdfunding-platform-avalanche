import { useForm } from "react-hook-form";

function CreateProjectComponent(props) {
    const { submit, errors, handleSubmit } = useForm();
    return (
        // onSubmit function to do further operation with form data --> not defined yet
        <div className="create-form">
            <form>
                <h1>Create Project</h1>
                <label>Category</label>
                <select name = "category" required ref={submit}>
                    <option value="design and tech">Design and Tech</option>
                    <option value="film">Film</option>
                    <option value="arts">Arts</option>
                    <option value="games">Games</option>
                </select>
                <label>Project Name</label>
                <input name="project-name" placeholder="Enter the project name" required ref={submit} />
                <label>Project Description</label>
                <textarea name="project-description" placeholder="Enter project description" cols="50" rows="5" required ref={submit} />
                <label>Creator Name</label>
                <input name="creator-name" placeholder="Enter Creator Name" required ref={submit} />
                <label>Upload Project Image</label>
                <input type="file" id="myFile" name="filename" accept="image/*" ref={submit} />
                <label>Project Link</label>
                <input type="url" name="project-link" placeholder="Enter link to the project" ref={submit} />
                <label>Funding Goal (AVAX)</label>
                <input type="number" step="0.00001" name="funding-goal" placeholder="Enter the funding goal" min="0.00001" required ref={submit} />
                <label>Duration (Days)</label>
                <input type="number" name="duration" placeholder="Enter the duration for the funding" min="1" required ref={submit} />
                <label>Refund policy</label>
                <select name="refund" required ref={submit}>
                    <option value="refundable">Refundable</option>
                    <option value="non-refundable">Non-Refundable</option>
                </select>
                <input type="submit" className="submitButton"/>
            </form>
        </div>
    );
}

export default CreateProjectComponent;