import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, Label, Input, FormGroup, Form, ModalHeader } from 'reactstrap';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import makeData from './../make-data';
import { getData, postData, deleteData } from './../../services/Utils/DB/DB';

const ManageLanguages = () => {
  const [rows, setRows] = useState([]);
  const [reloadStatus, setReloadStatus] = useState(0);
  const utoken = localStorage.getItem('utoken') || '';
  useEffect(() => {
    getData('/languages',utoken)
      .then((data) => {
        if (data) {
          setRows(data);
          console.log('Manage', data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reloadStatus]);

  const [languageTitle, setLanguageTitle] = useState("");
  const onChangeLanguageTitle = (e) => {
    const languageTitle = e.target.value;
    setLanguageTitle(languageTitle);
  }
  const [nativeLanguage, setNativeLanguage] = useState("");
  const onChangeNativeLanguage = (e) => {
    const nativeLanguage = e.target.value;
    setNativeLanguage(nativeLanguage);
  }
  const addLanguage = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('utoken');
    const form_data = {
      lang: languageTitle,
      nativeLang: nativeLanguage
    }
    postData('/languages', JSON.stringify(form_data), token)
      .then((response) => {
        // console.log(response);
      setReloadStatus(prev=>prev+1)
      })
      .catch((error) => {
        // console.log(error);
      });
    toggle();
  }
  
  const deleteLanguage = (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem('utoken');
    deleteData(`/languages?langId=${id}`, token)
      .then((response) => {
        // console.log(response);
      setReloadStatus(prev=>prev+1)
      })
      .catch((error) => {
        // console.log(error);
      });
  }
  const [open, setOpen] = useState(false);
  const [focusAfterClose, setFocusAfterClose] = useState(true);

  const toggle = () => setOpen(!open);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Language',
        columns: [
          {
            Header: 'Language',
            accessor: 'language',
            sortable: true,
          },
        ],
      },
      {
        Header: 'Native Language',
        columns: [
          {
            Header: 'Natuve Language',
            accessor: 'navtiveLanguage',
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


  return (
    <div>
      <ol className="breadcrumb float-xl-right">
        <li className="breadcrumb-item">
          <Link to="/">Dashboard</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/content-management/video-category">Video Languages</Link>
        </li>
        <li className="breadcrumb-item active">View Languages</li>
      </ol>
      <h1 className="page-header">
        Video Languages <small>manage and edit the Video Languages here.</small>
      </h1>
      <Panel>
        <PanelHeader noButton={true}>All Video Languages Lists
        <Button color="default" size="xs" className="mr-2 rounded-0 pull-right" onClick={toggle}>Add Category</Button>
        </PanelHeader>
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
                      <td>{rows[id].lang}</td>
                      <td>{rows[id].nativeLang}</td>
                      <td>{rows[id].createdBy}</td>
                      <td>{rows[id].createdAt}</td>
                      <td className="edit">
                        <a className="btn btn-primary btn-icon btn-circle btn-sm"><i className="fas fa-pencil-alt"></i></a>
                        <a onClick={(e)=>deleteLanguage(e, rows[id].langId)} className="btn btn-danger btn-icon btn-circle btn-sm"><i className="fas fa-trash-alt"></i></a>
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
      <ModalHeader toggle={toggle}>Add Language</ModalHeader>
        <ModalFooter>
              <FormGroup className="w-100">
                <Label for="languageTitle">Language Title</Label>
                <Input
                  type="text"
                  name="languageTitle"
                  id="languageTitle"
                  value={languageTitle}
                  onChange={onChangeLanguageTitle}
                />
            </FormGroup>
            <FormGroup className="w-100">
                <Label for="nativeLanguage">Native Language</Label>
                <Input
                    type="text"
                    name="nativeLanguage"
                    id="nativeLanguage"
                   value={nativeLanguage}
                   onChange={onChangeNativeLanguage}
                />
            </FormGroup>
            <Button color="primary" className="pull-right" onClick={addLanguage}>Submit</Button>
          <Button color="default" className="pull-right ml-2" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ManageLanguages;
