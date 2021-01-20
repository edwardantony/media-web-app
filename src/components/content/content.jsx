import React from 'react';

const content = (props) => { 
    return (
         <>
            {/* begin #content */}
              <div id="content" class="content">
              {/* begin breadcrumb */}
              <ol class="breadcrumb float-xl-right">
                <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
                <li class="breadcrumb-item active"><a href="javascript:;">Dashboard</a></li>
              </ol>
              {/* end breadcrumb */}
              {/* begin page-header */}
              <h1 class="page-header">Dashboard <small>Review your dashboard here...</small></h1>
              {/* end page-header */}
              {/* begin panel */}
              <div class="panel panel-inverse">
                <div class="panel-heading">
                  <h4 class="panel-title">Adminstrators</h4>
                  <div class="panel-heading-btn">
                    <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                    <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-redo"></i></a>
                    <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                  </div>
                </div>
                <div class="panel-body">
                  <table class="table table-striped m-b-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Username</th>
                                        <th>Email Address</th>
                                        <th width="1%"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="with-img">
                                            <img src="../assets/img/user/user-1.jpg" class="img-rounded height-30" />
                                        </td>
                                        <td>Nicky Almera</td>
                                        <td>nicky@hotmail.com</td>
                                        <td class="with-btn" nowrap="">
                                            <a href="#" class="btn btn-md btn-icon"><i class="fa fa-pencil-alt"></i></a>
                                            <a href="#" class="btn btn-md btn-icon "><i class="fa fa-trash-alt"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="with-img">
                                            <img src="../assets/img/user/user-2.jpg" class="img-rounded height-30" />
                                        </td>
                                        <td>Edmund Wong</td>
                                        <td>edmund@yahoo.com</td>
                                        <td class="with-btn" nowrap="">
                                            <a href="#" class="btn btn-md btn-icon"><i class="fa fa-pencil-alt"></i></a>
                                            <a href="#" class="btn btn-md btn-icon "><i class="fa fa-trash-alt"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="with-img">
                                            <img src="../assets/img/user/user-3.jpg" class="img-rounded height-30" />
                                        </td>
                                        <td>Harvinder Singh</td>
                                        <td>harvinder@gmail.com</td>
                                        <td class="with-btn" nowrap="">
                                            <a href="#" class="btn btn-md btn-icon"><i class="fa fa-pencil-alt"></i></a>
                                            <a href="#" class="btn btn-md btn-icon "><i class="fa fa-trash-alt"></i></a>
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                </div>
              </div>
              {/* end panel */}
            </div>
            {/* end #content */}
        </>
    ); 
  }
export default content;