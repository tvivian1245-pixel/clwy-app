import { Section as DefaultSection, Cell as DefaultCell } from 'clwy-react-native-tableview-simple'

export function Cell({ ...props }) {
  return (
    <DefaultCell
      accessory="DisclosureIndicator"
      titleTextStyle={{ textAlign: 'left', fontSize: 17 }}
      titleTextColor="#67c1b5"
      contentContainerStyle={{ height: 55 }}
      backgroundColor="#fff"
      {...props}
    />
  )
}

export function Section({ ...props }) {
  return (
    <DefaultSection
      hideSurroundingSeparators={true}
      roundedCorners={true}
      sectionPaddingTop={20}
      separatorInsetRight={'18'}
      separatorTintColor={'#ddd'}
      {...props}
    />
  )
}
