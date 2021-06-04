import NavBar from "../components/NavBar";
import {ProjectContainer, ProjectItem, ProjectRow} from "../components/Project";

export default function Projects() {
    return (
        <div style={{paddingBottom: 100}}>
            <NavBar />
            <ProjectContainer>
                <ProjectItem title="lucapalmi.com website !" image="/images/website.png" github_url="https://github.com/Lucino772/lucapalmi.com" project_url="https://lucapalmi.com"/>
                <ProjectRow>
                    <ProjectItem title="PyMojang python module" image="https://www.minecraft.net/content/dam/games/minecraft/logos/Minecraft-Java_Keyart_255x383.jpg" github_url="https://github.com/Lucino772/pymojang"/>
                    <ProjectItem title="Another Project" />
                </ProjectRow>
            </ProjectContainer>
        </div>
    )
}