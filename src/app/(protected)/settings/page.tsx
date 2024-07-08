import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
    const session = await auth();
    
    return(
        <div>
            Settings page <br />
            { JSON.stringify(session) }
            <form action={async () => {
                "use server";

                await signOut();
            }}>
                <button type="submit">Log ud</button>
            </form>
        </div>
    );
};

export default SettingsPage;