import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import Form from "./components/Form";
import { useState } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";

const sampleClaims = [
  {
    id: "CLM-1001",
    name: "John Smith",
    type: "Auto",
    status: "New",
    dateFiled: "2026-04-10",
  },
  {
    id: "CLM-1002",
    name: "Sarah Johnson",
    type: "Injury",
    status: "Under Review",
    dateFiled: "2026-04-12",
  },
];

export default function App() {
  const [claim, setClaim] = useState([...sampleClaims]);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  const toggleDialog = () => {
    setVisibleDialog(!visibleDialog);
  };

  const handleRowClick = (e) => {
    setSelectedClaim(e.dataItem);
    setVisibleDialog(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Claim Intake Dashboard</h2>
      {!visibleDialog && (
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
      )}

      {visibleDialog && (
        <Dialog title={selectedClaim ? "Update Claim" : "Add Claim"}>
          <Form
            claim={claim}
            setClaim={setClaim}
            toggleDialog={toggleDialog}
            selectedClaim={selectedClaim}
          />
        </Dialog>
      )}

      <Grid onRowClick={handleRowClick} data={claim}>
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
