
import React from 'react';
import { Switch, Route, Link } from "react-router-dom";


const sidebar = (props) => { 
    return (
        <>
          {/* begin #sidebar */}
            <div id="sidebar" class="sidebar">
              {/* begin sidebar scrollbar */}
              <div data-scrollbar="true" data-height="100%">
                {/* begin sidebar user */}
                <ul class="nav">
                  <li class="nav-profile">
                    <a href="javascript:;" data-toggle="nav-profile">
                      <div class="cover with-shadow"></div>
                      <div class="image image-icon bg-black text-grey-darker">
                        <i class="fa fa-user"></i>
                      </div>
                      <div class="info">
                        <b class="caret pull-right"></b>Edward Antony
                        <small>Front end developer</small>
                      </div>
                    </a>
                  </li>
                  <li>
                    <ul class="nav nav-profile">
                      <li><a href="javascript:;"><i class="fa fa-cog"></i> Settings</a></li>
                    </ul>
                  </li>
                </ul>
                {/* end sidebar user */}
                {/* begin sidebar nav */}
                <ul class="nav">
                  <li class="active">
                    <a href="/dashboard">
                      <i class="fa fa-th-large"></i>
                      <span>Dashboard</span>
                    </a>
                  </li>
                  <li class="has-sub">
                    <a href="javascript:;">
                      <b class="caret"></b>
                      <i class="fa fa-user-secret"></i>
                      <span>Adminstrators</span>
                    </a>
                    <ul class="sub-menu">
                      <li><a href="/admins/list-admins">View Admins</a></li>
                      <li><a href="/admins/add-admin">Add Admin</a></li>
                      <li><a href="/admins/admin-groups">Admin Group</a></li>
                    </ul>
                  </li>
                  <li class="has-sub">
                    <a href="javascript:;">
                      <b class="caret"></b>
                      <i class="fa fa-users"></i>
                      <span>Subscribers</span>
                    </a>
                    <ul class="sub-menu">
                      <li><a href="/subscribers/list-subscribers">View Subscribers</a></li>
                      <li><a href="/subscribers/add-subscriber">Add Subscriber</a></li>
                      <li><a href="/subscribers/subscriber-groups">Subscriber Group</a></li>
                    </ul>
                  </li>
                  <li class="has-sub">
                    <a href="javascript:;">
                      <b class="caret"></b>
                      <i class="fa fa-video"></i>
                      <span>Video Managment</span>
                    </a>
                    <ul class="sub-menu">
                      <li class="has-sub">
                        <a href="javascript:;">
                          <b class="caret"></b>
                          Manage Single Videos
                        </a>
                        <ul class="sub-menu">
                          <li><a href="javascript:;">View Videos</a></li>
                          <li><a href="javascript:;">Add Video</a></li>
                        </ul>
                                    
                      </li>
                      <li class="has-sub">
                        <a href="javascript:;">
                          <b class="caret"></b>
                          Manage Series Videos
                        </a>
                        <ul class="sub-menu">
                          <li><a href="javascript:;">View Videos</a></li>
                          <li><a href="javascript:;">Add Video</a></li>
                        </ul>
                                    
                      </li>
                      <li class="has-sub">
                        <a href="javascript:;">
                          <b class="caret"></b>
                          Manage Live Videos
                        </a>
                        <ul class="sub-menu">
                          <li><a href="javascript:;">View Videos</a></li>
                          <li><a href="javascript:;">Add Video</a></li>
                        </ul>
                                    
                      </li>
                      <li><a href="javascript:;">Manage Category</a></li>
                      <li><a href="javascript:;">Manage Languages</a></li>
                      <li><a href="javascript:;">Manage Genre</a></li>
                      <li><a href="javascript:;">Manage Cast / Crew</a></li>
                    </ul>
                  </li>
                  <li class="has-sub">
                    <a href="javascript:;">
                      <b class="caret"></b>
                      <i class="fa fa-flag"></i>
                      <span>Pages</span>
                    </a>
                    <ul class="sub-menu">
                      <li><a href="javascript:;">View Pages</a></li>
                      <li><a href="javascript:;">Add Page</a></li>
                    </ul>
                  </li>
                  {/* begin sidebar minify button */}
                  <li><a href="javascript:;" class="sidebar-minify-btn" data-click="sidebar-minify"><i class="fa fa-angle-double-left"></i></a></li>
                  {/* end sidebar minify button */}
                </ul>
                {/* end sidebar nav */}
              </div>
              {/* end sidebar scrollbar */}
            </div>
            <div class="sidebar-bg"></div>
            {/* end #sidebar */}
        </>
    ); 
  }
export default sidebar;