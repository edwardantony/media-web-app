import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import makeData from './../make-data';
import { getData } from './../../services/Utils/DB/DB';


const Banners = () => {
  const [rows, setRows] = useState([]);
  const utoken = localStorage.getItem('utoken') || '';
  useEffect(() => {
    getData('/banners', utoken)
      .then((data) => {
        console.log(data);
        if (data) {
          setRows(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const columns = React.useMemo(
    () => [
      {
        Header: 'Image',

        columns: [
          {
            Header: '',
            accessor: 'image',
            sortable: false,
          },
        ],
      },
      {
        Header: 'Title',
        columns: [
          {
            Header: 'Title',
            accessor: 'title',
            sortable: true,
          },
        ],
      },
      {
        Header: 'Active Image',
        columns: [
          {
            Header: 'Active Image',
            accessor: 'activeimage',
            sortable: true,
          },
        ],
      },
      {
        Header: 'Type',
        columns: [
          {
            Header: 'Type',
            accessor: 'type',
            sortable: true,
          },
        ],
      },
      {
        Header: 'Date Of Creation',
        columns: [
          {
            Header: 'Date Of Creation',
            accessor: 'createdAt',
            sortable: true,
          },
        ],
      },
      {
        Header: 'Category',
        columns: [
          {
            Header: 'Category',
            accessor: 'category',
            sortable: true,
          },
        ],
      },
      {
        Header: 'Status',
        columns: [
          {
            Header: 'Status',
            accessor: 'status',
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
          <Link to="/">Dashboard</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/content-management/video-category">Video Categories</Link>
        </li>
        <li className="breadcrumb-item active">View Categories</li>
      </ol>
      <h1 className="page-header">
        Video Banners <small>manage and edit the video banners here.</small>
      </h1>
      <Panel>
        <PanelHeader noButton={true}>All Video Banners Lists</PanelHeader>
        <div className="table-responsive">
          <table className="table table-striped table-bordered" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th key={index} {...column.getHeaderProps(column.getSortByToggleProps())}>
                      <div className="d-flex" style={{ minWidth: '1%' }}>
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
                    <tr key={rows[id].nativeLang}>
                      <td className='with-img'>
                      <img src={rows[id].imageUrls.landscape} alt={rows[id].title} className='img-rounded height-30' />
                      </td>
                      <td>{rows[id].title}</td>
                      <td>{rows[id].activeImage}</td>
                      <td>{rows[id].target.type}</td>
                      <td>{rows[id].createdBy}</td>
                      <td>{rows[id].target.category}</td>
                      <td>{rows[id].createdAt}</td>
                      <td>
                        {rows[id].target.status ? (
                          <span className="label label-green">{rows[id].target.status}</span>
                        ) : (
                          <span className="label label-danger">{rows[id].target.status}</span>
                        )}
                      </td>

                      <td className="edit">
                        <a className="btn btn-primary btn-icon btn-circle btn-sm"><i className="fas fa-pencil-alt"></i></a>
                        <a className="btn btn-danger btn-icon btn-circle btn-sm"><i className="fas fa-trash-alt"></i></a>
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

export default Banners;
