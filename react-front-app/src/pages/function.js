import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { BiSearch } from "react-icons/bi";

function TriggerExample() {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      인기도순은 판매실적, 검색정확도 점수를 기준으로 정렬됩니다.
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
    <Button variant="success"  > <BiSearch /> </Button>
    </OverlayTrigger>
  );
}

export default TriggerExample;