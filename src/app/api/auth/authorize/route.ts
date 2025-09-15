import {NextResponse} from 'next/server'


export async function GET() {
    // https://drchrono.com/o/authorize/?redirect_uri=REDIRECT_URI_ENCODED&response_type=code&client_id=CLIENT_ID_ENCODED&scope=SCOPES_ENCODED
    const redirect_uri = encodeURIComponent(process.env.DRCHRONO_REDIRECT_URI!)
    const client_id = process.env.DRCHRONO_CLIENT_ID
    const scope = encodeURIComponent(
    "patients:summary:read patients:summary:write calendar:read calendar:write clinical:read clinical:write"
  );

  const authUrl = `${process.env.DRCHRONO_AUTHORIZE_URL}/?redirect_uri=${redirect_uri}&response_type=code&client_id=${client_id}&scope=${scope}`

  return NextResponse.redirect(authUrl);
}
