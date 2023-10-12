const plansContainer = document.getElementById('plans');
let jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE2OTcxMTIwNjQsImV4cCI6MTY5NzE0ODA2NH0.c4kzWy-56GQqFd5wqOVuNHTNbEy5ReqbJyyRaoFtDhI";
const headers = {
  'Authorization': `Bearer ${jwtToken}`,
  'Content-Type': 'application/json',
};
fetch('http://localhost:3000/subscriptionPlan/list',{
        method: 'GET',
        headers: headers,
    })
    .then(response => response.json())
    .then(plans => {
        plansContainer.innerHTML = renderPlans(plans.data);
    })
    .catch(error => {
        console.error('Error fetching plans:', error);
        plansContainer.innerHTML = 'Error fetching plans.';
    });
function renderPlans(plans) {
    if (plans.length === 0) {
        return '<p>No subscription plans available.</p>';
    }

    let html = '';
    plans.forEach(plan => {
        html += `
            <div class="plan">
                <h2>${plan.name}</h2>
                <p class="description">${plan.description}</p>
                <p class="description">Cancellation period ${plan.cancellation_period} days</p>
                <p class="description">Max domains per month ${plan.max_domains_per_month}</p>
                <p class="description">Max Order ${plan.max_orders}</p>
                <p class="price">$${plan.price.toFixed(2)}</p>
                <button class="purchase-btn" onclick="purchasePlan(${plan.id})">Purchase</button>
            </div>
        `;
    });
    return html;
}
function purchasePlan(planId) {
    var stripe = Stripe("pk_test_51NsHj9SC7x5vD10MwSXcqvZoKpQxEOa2VuUNxCB0MfWKHd0oFMY4bEZAAulbIE23yP4Dk4fF0reCMQlfAh2ANsio00QXxoDW3d");
    var checkoutButton = document.getElementById("btn");
    // var jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE2OTU3OTYxMzEsImV4cCI6MTY5NTgzMjEzMX0.6friUvfDuRdny7RcIG-N_uGcbcxVXfFtc4ZStWdW_fY";
      fetch("http://localhost:3000/subscriptionPayment", {
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
        },
        method: "POST",
        body: JSON.stringify({
            "product": {
                "planId": planId, 
            }})
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (session) {
          return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
}
