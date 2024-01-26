import React from "react";
import CurrencyFormatter from "../shared/CurrencyFormatter";

const ContentLinksComponent = ({ content, goToContentLink }) => (
  <tr key={content.hash_id} onClick={() => goToContentLink(content.hash_id)}>
    <td>
      <div className="text-bl-green font-bold w-full conTitle">
        {content.domain_name}
      </div>
      <div className="overflow-hidden">{content.category.name}</div>
    </td>
    <td>{content.contentData.domain_rating}</td>
    <td>{content.contentData.authority}</td>
    <td>{content.contentData.trust_flow}</td>
    <td className="h3">{CurrencyFormatter.formatCurrency(content.price)}</td>
  </tr>
);

export default ContentLinksComponent;
