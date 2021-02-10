import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import makeData from '../make-data';
import { getData } from '../../services/Utils/DB/DB';

const AdminRoles = () => {
  const [rows, setRows] = useState([]);
  const utoken = localStorage.getItem('utoken') || '';
  useEffect(() => {
    getData('/roles',utoken)
      .then((data) => {
        if (data) {
          setRows(data);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Display Name',
        columns: [
          {
            Header: 'Display Name',
            accessor: 'displayName',
            sortable: true,
          },
        ],
      },
      {
        Header: 'Created By',
        columns: [
          {
            Header: 'Created By',
            accessor: 'createdBy',
            sortable: true,
          },
        ],
      },
      {
        Header: 'Date Of Creation',
        columns: [
          {
            Header: 'Date Of Creation',
            accessor: 'creation',
            sortable: true,
          },
        ],
      },
      {
        Header: 'Edit',
        columns: [
          {
            Header: '',
            accessor: 'edit',
            sortable: false,
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
  } = useTable({ columns, data, initialState: { pageIndex: 2 } }, useSortBy, usePagination);

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
        Adminstrators Roles <small>manage and approve the admin roles here.</small>
      </h1>
      <Panel>
        <PanelHeader>All Admin Roles Lists</PanelHeader>
        <div className="table-responsive">
          <table className="table table-striped table-bordered" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      <div class="d-flex" style={{ minWidth: '1%' }}>

                        <span>{column.render('Header')}</span>
                        <span className="ml-auto">
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
                            ''
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
                      <td>{rows[id].createdBy}</td>
                      <td>{rows[id].createdAt}</td>
                      <td className="edit">
                        <a href="javascript:;" class="btn btn-primary btn-icon btn-circle btn-sm"><i class="fas fa-pencil-alt"></i></a>
                        <a href="javascript:;" class="btn btn-danger btn-icon btn-circle btn-sm"><i class="fas fa-trash-alt"></i></a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
        <hr className="m-0" />
        <PanelBody>
          <div className="d-flex align-items-center justify-content-center">
            <ul className="pagination mb-0">
              <li className="page-item">
                <button className="page-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  <i className="fa fa-angle-double-left"></i>
                </button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage}>
                  <i className="fa fa-angle-left"></i>
                </button>
              </li>
              <li className="page-item d-flex align-items-center px-2">
                <div>
                  Page{' '}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>
                </div>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={() => nextPage()} disabled={!canNextPage}>
                  <i className="fa fa-angle-right"></i>
                </button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  <i className="fa fa-angle-double-right"></i>
                </button>
              </li>
            </ul>
            <div className="ml-3 mr-1">Go to page:</div>
            <div className="width-50 mx-2">
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

export default AdminRoles;
