import {
  View,
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Group,
  Card,
  Avatar,
  Title,
  Button,
} from "@vkontakte/vkui";
import {
  Icon28MenuOutline,
  Icon28FavoriteCircleFillGreen,
} from "@vkontakte/icons";

const Profile = () => {
  const isMy = true;

  return (
    <View id="profile" activePanel="profile">
      <Panel id="profile">
        <PanelHeader
          after={
            isMy && (
              <PanelHeaderButton
                onClick={() => console.log("menu")}
                aria-label="menu"
              >
                <Icon28MenuOutline />
              </PanelHeaderButton>
            )
          }
        >
          Профиль
        </PanelHeader>
        <Group>
          <Card
            mode="tint"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "36px 16px 53px",
              gap: "16px",
              background: "var(--vkui--color_background_content)",
            }}
          >
            <Avatar size={96} initials="UU">
              <Avatar.Badge>
                <Icon28FavoriteCircleFillGreen />
              </Avatar.Badge>
            </Avatar>
            <Title level="2">User User</Title>
            {isMy ? (
              <Button size="l" stretched>
                Редактировать
              </Button>
            ) : (
              <Button size="l" stretched>
                Написать
              </Button>
            )}
          </Card>
        </Group>
      </Panel>
    </View>
  );
};

export default Profile;
