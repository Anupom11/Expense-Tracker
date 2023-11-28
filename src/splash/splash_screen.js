import React from "react";

const SplashScreen = ()=> {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Constants.manifest?.splash?.backgroundColor,
            }}
        >
          {/* <LogoSVG width={SIZE} height={SIZE} fill="#3466F6" /> */}
        </View>
      );
}


  