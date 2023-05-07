import {
  Panel,
  PanelHeader,
  SplitCol,
  SplitLayout,
  View,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/cssm/styles/themes.css";
import { HomePage } from "pages/Home";

function App() {
  return (
    <SplitLayout header={<PanelHeader separator={false} />}>
      <SplitCol autoSpaced>
        <View activePanel="main">
          <Panel id="main">
            <PanelHeader>VK Booking Meetings room</PanelHeader>
            <HomePage />
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
}

export default App;
