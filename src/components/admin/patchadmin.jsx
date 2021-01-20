import React from 'react';

const patchadmin = (props) => { 
    return (
      <>
          {/* begin #content */}
          <div id="content" class="content">
            {/* begin breadcrumb */}
            <ol class="breadcrumb float-xl-right">
              <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
              <li class="breadcrumb-item"><a href="javascript:;">Admins</a></li>
              <li class="breadcrumb-item active"><a href="javascript:;">Edit Admin</a></li>
            </ol>
            {/* end breadcrumb */}
            {/* begin page-header */}
            <h1 class="page-header">Edit Admin <small>Change the admin field options...</small></h1>
            {/* end page-header */}
            {/* begin panel */}
            <div class="panel panel-inverse">
              <div class="panel-heading">
                <h4 class="panel-title">Edit Adminstrators</h4>
                <div class="panel-heading-btn">
                  <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                  <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-redo"></i></a>
                  <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                </div>
              </div>
              <div class="panel-body">
                 <h1>Edit form for admin</h1>
              </div>
            </div>
            {/* end panel */}
          </div>
          {/* end #content */}
      </>
    ); 
  }
export default patchadmin;