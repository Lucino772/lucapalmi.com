import NavBar from "../components/NavBar";
import { ProjectContainer, ProjectItem } from "../components/Project";
import { Scrollbars } from "react-custom-scrollbars";


export default function Projects() {
    return (
        <Scrollbars universal autoHeight autoHeightMin="100vh">
            <div style={{paddingBottom: 100}}>
                <NavBar showLogo exitDelay={0.2} />
                <ProjectContainer>
                    <ProjectItem title="lucapalmi.com website !" image="/images/website.png" github_url="https://github.com/Lucino772/lucapalmi.com" project_url="https://lucapalmi.com"/>
                    <ProjectItem enterDelay={0.1} title="PyMojang python module" image="https://www.minecraft.net/content/dam/games/minecraft/logos/Minecraft-Java_Keyart_255x383.jpg" github_url="https://github.com/Lucino772/pymojang"/>
                    <ProjectItem enterDelay={0.3} title="Another Project" />
                </ProjectContainer>
            </div>
        </Scrollbars>
    )
}