import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, Label, Input, FormGroup, Form, ModalHeader } from 'reactstrap';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import makeData from './../make-data';
import { getData, postData } from './../../services/Utils/DB/DB';

const ManageCategories = () => {
  const [rows, setRows] = useState([]);
  const utoken = localStorage.getItem('utoken') || '';
  useEffect(() => {
    getData('/categories',utoken)
      .then((data) => {
        if (data) {
          setRows(data);
          console.log('Manage', data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  const [category, setCategory] = useState("");
  const onChangeCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  }
  const [displayOrder, setDisplayOrder] = useState("");
  const onChangeDisplayOrder = (e) => {
    const displayOrder = e.target.value;
    setDisplayOrder(displayOrder);
  }
  const addCategory = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('utoken');
    const form_data = {
      category: category,
      displayOrder: displayOrder
    }
    postData('/cateories', JSON.stringify(form_data), token)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        // console.log(error);
      });
    toggle();
  }
  
  const columns = React.useMemo(
    () => [
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
        Header: 'Content Creator',
        columns: [
          {
            Header: 'Content Creator',
            accessor: 'contentCreator',
            sortable: true,
          },
        ],
      },
      {
        Header: 'Date Of Creation',
        columns: [
          {
            Header: 'Date Of Creation',
            accessor: 'dateCreated',
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

  const [open, setOpen] = useState(false);
  const [focusAfterClose, setFocusAfterClose] = useState(true);

  const toggle = () => setOpen(!open);

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
        Video Categories <small>manage and edit the video categories here.</small>
      </h1>
      <Panel>
      <PanelHeader noButton={true}>All Video Categories Lists
        <Button color="default" size="xs" className="mr-2 rounded-0 pull-right" onClick={toggle}>Add Category</Button></PanelHeader>
        <div className="table-responsive">
          <table className="table table-striped table-bordered" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                      <td>{rows[id].category}</td>
                      <td>{rows[id].createdBy}</td>
                      <td>{rows[id].updatedAt}</td>
                      <td className="edit">
                        <a href="javascript:;" className="btn btn-primary btn-icon btn-circle btn-sm"><i className="fas fa-pencil-alt"></i></a>
                        <a href="javascript:;" className="btn btn-danger btn-icon btn-circle btn-sm"><i className="fas fa-trash-alt"></i></a>
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
      <Modal returnFocusAfterClose={focusAfterClose} isOpen={open}>
      <ModalHeader toggle={toggle}>Add Category</ModalHeader>
        <ModalFooter>
              <FormGroup className="w-100">
                <Label for="category">Category Title</Label>
                <Input
                  type="text"
                  name="category"
                  id="category"
                  value={category}
                  onChange={onChangeCategory}
                />
            </FormGroup>
            <FormGroup className="w-100">
                <Label for="displayOrder">Sort Order</Label>
                <Input
                    type="text"
                    name="displayOrder"
                    id="displayOrder"
                   value={displayOrder}
                   onChange={onChangeDisplayOrder}
                />
            </FormGroup>
            <Button color="primary" className="pull-right" onClick={addCategory}>Submit</Button>
          <Button color="default" className="pull-right ml-2" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ManageCategories;
