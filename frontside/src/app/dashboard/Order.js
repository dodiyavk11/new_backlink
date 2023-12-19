import React from "react";
import TimeAgo from "timeago-react";
const getStatusClass = (status) => {
  switch (status) {
    case "Pending":
      return "badge-primary";
    case "Completed":
      return "badge-success";
    case "Cancelled":
      return "badge-danger";
    case "Rejected":
      return "badge-warning";
    case "Inprogress":
      return "badge-secondary";
    default:
      return "badge-info";
  }
};
const OrderComponent = ({ order, viewOrder }) => (
  <div className="card" key={order.id}>
    <div className="card-body" style={{ padding: "1.5rem 0.5rem" }}>
      <table>
        <tbody>
          <tr onClick={() => viewOrder(order.id)}>
            <td>
              <h4>{order.isBundle != 0 ?  "Link Bundle" : order.domain.domain_name}</h4>
              <div className="extraInfo flex-wrap d-flex justify-content-between">
                <div>
                  {order.project && order.project.domain_name
                    ? order.project.domain_name
                    : "No project"}
                </div>

                <i className="mdi mdi-checkbox-blank-circle d-flex align-items-center justify-content-center iconBash"></i>
                <span  style={{ padding: "3px" }} className={`badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
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
