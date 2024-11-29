import React from "react";

const LazyComponent = () => {
  return (
    <div>
      <h2>This is a lazily loaded component!</h2>
      <p>
        You can now dynamically import this component in your main application.
      </p>
    </div>
  );
};

export default LazyComponent;
