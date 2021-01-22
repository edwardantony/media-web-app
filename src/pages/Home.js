import React, { useState, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../components/panel/panel.jsx";
import makeData from "./make-data";
import firebase from "../services/firebase";

const Home = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    firebase.child("admins").on("value", (snapshot) => {
      console.log("Admin list", snapshot.val());
      setRows(snapshot.val());
    });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Personal Details",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
            sortable: true,
          },
          {
            Header: "Email",
            accessor: "email",
            sortable: true,
          },
        ],
      },
      {
        Header: "Account Verifcation Status",
        columns: [
          {
            Header: "isEmail verified",
            accessor: "age",
            sortable: true,
          },
        ],
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(2000), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 2 } },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <ol className="breadcrumb float-xl-right">
        <li className="breadcrumb-item">
          <Link to="/table/data">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/table/data">Tables</Link>
        </li>
        <li className="breadcrumb-item active">Data Tables</li>
      </ol>
      <h1 className="page-header">
        Adminstrators <small>manage and approve the admins here.</small>
      </h1>
      <Panel>
        <PanelHeader>All Admin Lists</PanelHeader>
        <div class="table-responsive">
          <table
            class="table table-striped table-bordered"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="width-150"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div class="d-flex" style={{ minWidth: "150px" }}>
                        <span>{column.render("Header")}</span>
                        <span class="ml-auto">
                          {column.sortable ? (
                            column.isSorted ? (
                              column.isSortedDesc ? (
                                <i className="fa fa-sort-down fa-fw f-s-14 text-blue"></i>
                              ) : (
                                <i className="fa fa-sort-up fa-fw f-s-14 text-blue"></i>
                              )
                            ) : (
                              <i className="fa fa-sort fa-fw f-s-14 opacity-3"></i>
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {rows && (
              <tbody {...getTableBodyProps()}>
                {Object.keys(rows).map((id) => {
                  return (
                    <tr key={rows[id].displayName}>
                      <td>{rows[id].displayName}</td>
                      <td>{rows[id].email}</td>
                      <td>
                        {rows[id].emailVerified ? (
                          <h5>True</h5>
                        ) : (
                          <h5>False</h5>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
        <hr class="m-0" />
        <PanelBody>
          <div class="d-flex align-items-center justify-content-center">
            <ul className="pagination mb-0">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  <i className="fa fa-angle-double-left"></i>
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <i className="fa fa-angle-left"></i>
                </button>
              </li>
              <li className="page-item d-flex align-items-center px-2">
                <div>
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>
                </div>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  <i className="fa fa-angle-right"></i>
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  <i className="fa fa-angle-double-right"></i>
                </button>
              </li>
            </ul>
            <div class="ml-3 mr-1">Go to page:</div>
            <div class="width-50 mx-2">
              <input
                className="form-control"
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
              />
            </div>
            <div>
              <select
                className="form-control"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </PanelBody>
      </Panel>
    </div>
  );
};

export default Home;
