import { TextBox, TextArea } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Button } from "@progress/kendo-react-buttons";
import { useState } from "react";

const types = ["Auto", "Injury", "Property", "Disability"];
const status = ["New", "In Progress", "Under Review", "Completed", "Closed"];

function Form({ claim, setClaim, toggleDialog, selectedClaim }) {
  const [userInput, setUserInput] = useState(
    selectedClaim || {
      name: "",
      type: "Auto",
      date_incident: new Date(),
      date_filed: new Date(),
      status: "New",
      desc: "",
    },
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKendoChange = (e, field) => {
    setUserInput((prev) => ({
      ...prev,
      [field]: e.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedClaim) {
      const updatedClaim = {
        ...selectedClaim,
        ...userInput,
      };

      setClaim((prev) =>
        prev.map((c) => (c.id === updatedClaim.id ? updatedClaim : c)),
      );
    } else {
      const newClaim = {
        id: "CLM-" + Math.floor(100000 + Math.random() * 900000),
        ...userInput,
      };

      setClaim((prev) => [...prev, newClaim]);
    }

    toggleDialog();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <TextBox
          name="name"
          value={userInput.name}
          onChange={handleInputChange}
          placeholder="Bob Smith"
          required
        />
      </div>

      <div>
        <label>Type</label>
        <DropDownList
          data={types}
          value={userInput.type}
          onChange={(e) => handleKendoChange(e, "type")}
          required
        />
      </div>

      <div>
        <label>Date of Incident</label>
        <DatePicker
          value={userInput.date_incident}
          onChange={(e) => handleKendoChange(e, "date_incident")}
          required
        />
      </div>

      <div>
        <label>Date Filed</label>
        <DatePicker
          value={userInput.date_filed}
          onChange={(e) => handleKendoChange(e, "date_filed")}
          required
        />
      </div>

      <div>
        <label>Status</label>
        <DropDownList
          data={status}
          value={userInput.status}
          onChange={(e) => handleKendoChange(e, "status")}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <TextArea
          name="desc"
          value={userInput.desc}
          onChange={handleInputChange}
          placeholder="Place text here..."
          required
        />
      </div>

      <Button themeColor="primary" type="submit">
        Submit
      </Button>
      <Button onClick={toggleDialog}>Close</Button>
    </form>
  );
}

export default Form;
