import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import Form from "./components/Form";
import { useState } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { filterBy } from "@progress/kendo-data-query";
import { TextBox } from "@progress/kendo-react-inputs";
import "./App.css";

const sampleClaims = [
  {
    id: "CLM-" + Math.floor(100000 + Math.random() * 900000),
    name: "John Smith",
    type: "Auto",
    date_incident: new Date(),
    date_filed: new Date(),
    status: "Under Review",
    desc: "Auto mobile accident",
  },
  {
    id: "CLM-" + Math.floor(100000 + Math.random() * 900000),
    name: "Sarah Johnson",
    type: "Injury",
    date_incident: new Date(),
    date_filed: new Date(),
    status: "New",
    desc: "Injured in work accident",
  },
];

export default function App() {
  const [claim, setClaim] = useState([...sampleClaims]);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [filter, setFilter] = useState(null);

  const toggleDialog = () => {
    setVisibleDialog(!visibleDialog);
  };

  const handleRowClick = (e) => {
    setSelectedClaim(e.dataItem);
    setVisibleDialog(true);
  };

  const filteredClaims = filterBy(claim, filter);

  return (
    <div style={{ padding: 20 }}>
      <h2>Claim Intake Dashboard</h2>

      {!visibleDialog && (
        <div className="center-claim">
          <Button
            type="button"
            themeColor="primary"
            onClick={() => {
              setSelectedClaim(null);
              toggleDialog();
            }}
          >
            Add Claim
          </Button>
        </div>
      )}

      {visibleDialog && (
        <>
          <div className="center-claim">
            <Button themeColor="primary">Add Claim</Button>
          </div>
          <Dialog
            onClose={toggleDialog}
            title={selectedClaim ? "Update Claim" : "Add Claim"}
          >
            <Form
              setClaim={setClaim}
              toggleDialog={toggleDialog}
              selectedClaim={selectedClaim}
            />
          </Dialog>
        </>
      )}
      <div style={{ marginBottom: "10px" }}>
        <TextBox
          placeholder="Search claims..."
          onChange={(e) => {
            const value = e.target.value;

            setFilter(
              value
                ? {
                    logic: "or",
                    filters: [
                      { field: "id", operator: "contains", value },
                      { field: "name", operator: "contains", value },
                      { field: "type", operator: "contains", value },
                      { field: "status", operator: "contains", value },
                      { field: "desc", operator: "contains", value },
                    ],
                  }
                : null,
            );
          }}
        />
      </div>
      <Grid
        style={{ cursor: "pointer" }}
        onRowClick={handleRowClick}
        data={filteredClaims}
      >
        <GridColumn field="id" title="Claim ID" />
        <GridColumn field="name" title="Name" />
        <GridColumn field="type" title="Type" />
        <GridColumn
          field="date_incident"
          title="Date of Incident"
          format="{0:MM/dd/yyyy}"
        />
        <GridColumn
          field="date_filed"
          title="Date Filed"
          format="{0:MM/dd/yyyy}"
        />
        <GridColumn field="status" title="Status" />
        <GridColumn field="desc" title="Description" />
      </Grid>
    </div>
  );
}
