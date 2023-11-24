import React from "react";
import TimeAgo from "timeago-react";

const DomainComponent = ({ item,goToProjectViewLink }) => (
  <div className="card" key={item.id}>
    <div className="card-body dashboardCard" onClick={() => goToProjectViewLink(item.hash_id)}>
      <table>
        <tbody>
          <tr>
            <td>
              <span className="proCircle">
                {extractInitials(item.domain_name)}
              </span>
            </td>
            <td>
              <h4>{item.domain_name}</h4>
              <div className="extraInfo d-flex flex-wrap justify-content-between">
                <div>0 Recommendations</div>
                <i className="mdi mdi-checkbox-blank-circle d-flex align-items-center justify-content-center iconBash"></i>
                <div>{item.order_count} Orders</div>
                <i className="mdi mdi-checkbox-blank-circle d-flex align-items-center justify-content-center iconBash"></i>
                <div>
                  <TimeAgo datetime={item.created_at} locale="en" />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
const extractInitials = (name) => {
  const names = name.split(" ");
  if (names.length === 1) {
    return names[0].substring(0, 2);
  } else if (names.length > 1) {
    return names[0][0] + names[names.length - 1][0];
  } else {
    return "";
  }
};
export default DomainComponent;
