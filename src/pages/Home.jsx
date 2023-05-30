import React from "react";
import { Button } from "antd";
function Home() {
  return (
    <div>
      <Button style={{ marginRight: 10 }} type="primary">
        Primary
      </Button>
      <Button style={{ marginRight: 10 }}>Default</Button>
      <Button style={{ marginRight: 10 }} type="dashed">
        Dashed
      </Button>
      <Button style={{ marginRight: 10 }} type="primary" danger>
        Primary
      </Button>
      <Button style={{ marginRight: 10 }} danger>
        Default
      </Button>
      <Button style={{ marginRight: 10 }} type="dashed" danger>
        Dashed
      </Button>
    </div>
  );
}
export default Home;
