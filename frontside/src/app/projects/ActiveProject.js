import React, { useState, useEffect } from "react";
import TimeAgo from "timeago-react";
import "../../assets/custom.css";
import ApiServices from "../services/api.service";
import { Trans } from "react-i18next";

const ActiveProjects = ({ project, goToProjectViewLink }) => {
  const [imageExists, setImageExists] = useState(true);

  useEffect(() => {
    const checkImageExists = async () => {
      try {
        const response = await fetch(ApiServices.APP_URL.replace(/\/$/, '') + project.image_url);
        setImageExists(response.ok);
      } catch (error) {
        console.error("Error checking image", error);
        setImageExists(false);
      }
    };

    checkImageExists();
  }, [project.image_url]);

  return (
    <div className="col-md-4 mb-2">
      <div className="card border rounded p-3 cursorClass" onClick={() => goToProjectViewLink(project.hash_id)}>
        {imageExists ? (
          <img
            src={ApiServices.APP_URL.replace(/\/$/, '') + project.image_url}
            className="card-img-top"
            alt=""
          />
        ) : (
            <img
            src={require("../../assets/images/blank_image.jpg")}
            className="card-img-top"
            alt=""
          />
        )}
        <div className="card-body activeProject">
          <h5 className="card-title">{project.domain_name}</h5>
          <div className="extraInfo d-flex flex-wrap justify-content-between">
            <div>0 <Trans>Recommendations</Trans></div>
            <i className="mdi mdi-checkbox-blank-circle d-flex align-items-center justify-content-center iconBash"></i>
            <div>{project.order_count} <Trans>Orders</Trans></div>
            <i className="mdi mdi-checkbox-blank-circle d-flex align-items-center justify-content-center iconBash"></i>
            <div>
              <TimeAgo datetime={project.created_at} locale="en" />
            </div>
          </div>
          <hr />
          <div className="proBudget extraInfo">
            {project.budget !== "0.00" ? (
              <span>{project.budget}</span>
            ) : (
              <span><Trans>No monthly budget provided</Trans></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveProjects;
