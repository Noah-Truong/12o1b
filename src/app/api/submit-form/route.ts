import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

interface FormData {
  firstName: string
  lastName: string
  companyName: string
  jobTitle: string
  workEmail: string
  country: string
  budget: string
  projectDetails: string
}

export async function POST(request: Request) {
  try {
    const body: FormData = await request.json()
    
    const { firstName, lastName, companyName, jobTitle, workEmail, country, budget, projectDetails } = body

    // Validate required fields
    if (!firstName || !lastName || !companyName || !jobTitle || !workEmail || !country || !budget || !projectDetails) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const emailContent = `
New Project Inquiry from 12o1b Website

Contact Information:
--------------------
Name: ${firstName} ${lastName}
Company: ${companyName}
Job Title: ${jobTitle}
Email: ${workEmail}
Country: ${country}

Project Details:
----------------
Budget Range: ${budget}

Project Description:
${projectDetails}

--------------------
This message was sent from the 12o1b website contact form.
    `.trim()

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0d0d0d, #1a1a1a); color: #00d4ff; padding: 30px; border-radius: 12px 12px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f5f5f5; padding: 30px; border-radius: 0 0 12px 12px; }
    .section { margin-bottom: 24px; }
    .section-title { font-size: 14px; text-transform: uppercase; color: #8a8a8a; margin-bottom: 8px; letter-spacing: 1px; }
    .field { margin-bottom: 12px; }
    .label { font-weight: 600; color: #0d0d0d; }
    .value { color: #2a2a2a; }
    .highlight { background: #00d4ff20; padding: 4px 8px; border-radius: 4px; display: inline-block; }
    .details { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #00d4ff; }
    .footer { text-align: center; margin-top: 20px; color: #8a8a8a; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 New Project Inquiry</h1>
    </div>
    <div class="content">
      <div class="section">
        <div class="section-title">Contact Information</div>
        <div class="field"><span class="label">Name:</span> <span class="value">${firstName} ${lastName}</span></div>
        <div class="field"><span class="label">Company:</span> <span class="value">${companyName}</span></div>
        <div class="field"><span class="label">Job Title:</span> <span class="value">${jobTitle}</span></div>
        <div class="field"><span class="label">Email:</span> <span class="value"><a href="mailto:${workEmail}">${workEmail}</a></span></div>
        <div class="field"><span class="label">Country:</span> <span class="value">${country}</span></div>
      </div>
      
      <div class="section">
        <div class="section-title">Budget</div>
        <div class="highlight">${budget}</div>
      </div>
      
      <div class="section">
        <div class="section-title">Project Details</div>
        <div class="details">${projectDetails.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      This message was sent from the 12o1b website contact form.
    </div>
  </div>
</body>
</html>
    `.trim()

    const { error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['noahtruong123@gmail.com'],
      subject: `New Project Inquiry from ${firstName} ${lastName} - ${companyName}`,
      text: emailContent,
      html: htmlContent,
      replyTo: workEmail,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

