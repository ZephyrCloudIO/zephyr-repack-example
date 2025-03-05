function VersionSwitcher() {

const switchRemotes = () => {
    // global.window.location = {
    //   href: '', //  window.location.href returns the href (URL) of the current page
    //   hostname: '', //window.location.hostname returns the domain name of the web host
    //   pathname: '', //window.location.pathname returns the path and filename of the current page
    //   protocol: 'https', //window.location.protocol returns the web protocol used (http: or https:)
    //   assign: null, //window.location.assign loads a new document
    // };
    registerRemotes(
      [
        {
          name: 'MobileInventory',
          entry:
            'https://boris-yankov-jfrpliow5v-138-mobileinventory-zephy-521bff6e6-ze.zephyrcloud.app/mf-manifest.json',
        },
      ],
      // {force: true},
    );
    //
    // init({...mfConfig, force: true});
  };
}

  return (
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <Text>Current version is: ???</Text>
        <Button onPress={switchRemotes}>Switch Remotes</Button>
        {/* <Icon source={icon} size={100} />
        <Text style={styles.title} variant="titleLarge">
          {title}
        </Text> */}
      </View>
  );
}
}