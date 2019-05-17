import React, { useState } from "react";
import ReactTable from "react-table";

export function Filter() {
  const { data, pages, loading } = useState("");

  return (
    <div>
      <ReactTable
        columns={[
          {
            columns: [
              {
                Header: "Offence",
                accessor: "offence"
              },
              {
                Header: "Area",
                accessor: "area"
              },
              {
                Header: "Age",
                accessor: "age"
              },
              {
                Header: "Year",
                accessor: "year"
              }
            ]
          }
        ]}
        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
        data={data}
        pages={pages} // Display the total number of pages
        loading={loading} // Display the loading overlay when we need it
        // onFetchData={this.fetchData} // Request new data when things change
        filterable
        defaultPageSize={10}
        className="-striped -highlight"
      />
    </div>
  );
}
