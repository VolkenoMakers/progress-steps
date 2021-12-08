# progress-steps

![Single select](https://raw.githubusercontent.com/VolkenoMakers/progress-steps/files/demo.gif)

## Add it to your project

- Using NPM
  `npm install @volkenomakers/progress-steps`
- or:
- Using Yarn
  `yarn add @volkenomakers/progress-steps`

## Usage

```javascript
import React from "react";
import { View, Button, Text } from "react-native";
import ProgressSteps from "@volkenomakers/progress-steps";

const ProgressStapsApp = () => {
  return (
    <ProgressSteps
      onFinish={() => console.log("finished")}
      indicatorColor="#FFF"
      indicatorHeight={5}
      containerStyle={{ flex: 1, backgroundColor: "#3498db", paddingTop: 24 }}
      indicatorContainerStyle={{
        backgroundColor: "#3498db",
        paddingVertical: 10,
      }}
      renderEndButton={(onPress) => (
        <Button color={"#FFF"} title={"Done"} onPress={onPress} />
      )}
      renderNextButton={(onPress) => (
        <Button color={"#FFF"} title={"Next"} onPress={onPress} />
      )}
    >
      <Step title="First step" />
      <Step title="Step2" />
      <Step title="Step3" />
      <Step title="Last step" />
    </ProgressSteps>
  );
};

export default ProgressStapsApp;

const Step = ({ title }) => {
  return (
    <View
      style={{
        backgroundColor: "#EEE",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 40 }}>{title}</Text>
    </View>
  );
};
```

## Properties

| Property name               | Type       | Description                                                 |
| --------------------------- | ---------- | ----------------------------------------------------------- |
| **onFinish**                | _Function_ | callback to be called when the user click to the end button |
| **indicatorContainerStyle** | _Object_   | Custom style for the container of indicators                |
| **containerStyle**          | _Object_   | Custom style for the View container                         |
| **indicatorColor**          | _String_   | color of the indicators                                     |
| **indicatorHeight**         | _Number_   | height of the indicators                                    |
| **renderNextButton**        | _Function_ | render the next button                                      |
| **renderEndButton**         | _String_   | render the end button                                       |

**ISC Licensed**
