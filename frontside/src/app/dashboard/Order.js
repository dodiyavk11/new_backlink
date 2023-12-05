import React from "react";
import TimeAgo from "timeago-react";

const OrderComponent = ({ order }) => (
  <div className="card" key={order.id}>
    <div className="card-body" style={{ padding: "1.5rem 0.5rem" }}>
      <table>
        <tbody>
          <tr>
            <td>
              <h4>{order.domain.domain_name}</h4>
              <div className="extraInfo flex-wrap d-flex justify-content-between">
                <div>
                  {order.project && order.project.domain_name
                    ? order.project.domain_name 
                    : "No project"}
                </div>

                <i className="mdi mdi-checkbox-blank-circle d-flex align-items-center justify-content-center iconBash"></i>
                <div
                  style={{ padding: "3px" }}
                  className={
                    order.status === "Pending"
                      ? "badge badge-danger"
                      : order.status === "Inprogress"
                      ? "badge badge-info"
                      : order.status === "Completed"
                      ? "badge badge-success"
                      : "badge badge-warning"
                  }
                >
                  {order.status}
                </div>
                <i className="mdi mdi-checkbox-blank-circle d-flex align-items-center justify-content-center iconBash"></i>
                <div>${order.total_price}</div>
                <i className="mdi mdi-checkbox-blank-circle d-flex align-items-center justify-content-center iconBash"></i>
                <div>
                  <TimeAgo datetime={order.created_at} locale="en" />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default OrderComponent;
