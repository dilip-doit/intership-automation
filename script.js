const pup = require("puppeteer");
let {id,pass} = require("./secret");
let tab;
let dataFile = require("./data");

async function main(){

        let browser = await pup.launch({
            headless : false,
            defaultViewport : false,
            args : ["--start-maximized"]
        });

        let pages = await browser.pages();
        tab = pages[0];
        await tab.goto("https://internshala.com/login");
        // await tab.click(".btn.btn-secondary.home_page_login_button")
        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 1000);
        });
        await tab.type("#email", id);
        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 1000);
        });
        await tab.type("#password", pass);
        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 1000);
        });
        await tab.click("#login_submit");

         await tab.waitForNavigation({waitUntil : "networkidle2"});
        await tab.click(".nav-link.dropdown-toggle.profile_container .is_icon_header.ic-24-filled-down-arrow");

         let profile_options = await tab.$$(".profile_options a");
         let app_urls = [];
         for(let i=0; i<11; i++){
            let url = await tab.evaluate(function(ele){
                    return ele.getAttribute("href"); 
            }, profile_options[i]); 
            app_urls.push(url);    
        }
        await new Promise(function(resolve,reject){
            return setTimeout(resolve, 2000);
        });
        tab.goto("https://internshala.com"+app_urls[3]);
        await new Promise(function(resolve,reject){
            return setTimeout(resolve, 3000);
        });

        await tab.waitForSelector("#career-objective-form-modal", { visible: true });
        await tab.click("#career-objective-form-modal");

        await careerObj(dataFile[0]);

        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 3000);
        });

        await tab.waitForSelector("#education", { visible: true });
        await tab.click("#education");

        await tab.waitForSelector("#graduation-tab", { visible: true });
        await tab.click("#graduation-tab");

        await graduation(dataFile[0]);

        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 10000);
        });

        await tab.waitForSelector("#senior_secondary-tab", { visible: true });
        await tab.click("#senior_secondary-tab");

        await senior_secondary(dataFile[1]);

        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 3000);
        });


        await tab.waitForSelector("#internship", { visible: true });
        await tab.click("#internship");

        await internship(dataFile[3]);

        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 3000);
        });

        // // await tab.waitForSelector("#por-resume", { visible: true });
        // // await tab.click("#por-resume");

        // // await extraCurricular(dataFile[0]);

        // // await new Promise(function(resolve,reject){                              
        // //     return setTimeout(resolve, 3000);
        // // });

        await tab.waitForSelector("#training-resume", { visible: true });
        await tab.click("#training-resume");

        await courses(dataFile[4]);

        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 3000);
        });


        // // await tab.waitForSelector("#project-resume", { visible: true });
        // // await tab.click("#project-resume");

        // // await projects(dataFile[4]);

        // // await new Promise(function(resolve,reject){                              
        // //     return setTimeout(resolve, 3000);
        // // });


        // // await tab.waitForSelector("#education", { visible: true });
        // // await tab.click("#education");

        // // await tab.waitForSelector("#secondary-tab", { visible: true });
        // // await tab.click("#secondary-tab");

        // // await secondary(dataFile[2]);



        // // await tab.waitForSelector(".resume_download_mobile", {visible : true});
        // // await tab.click(".resume_download_mobile");                                // if you want to download resume.
        


        async function careerObj(data){
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 3000);
            });

            await tab.waitForSelector("#career_objective_description", {visible : true});
            await tab.type("#career_objective_description", data["CareerObjective"]);

            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
            await tab.click("#career-objective-submit");
        }

        async function graduation(data){
            // await tab.waitForSelector("#degree_completion_status_pursuing", {visible : true});
            // await tab.click("#degree_completion_status_pursuing");
            await new Promise(function(resolve,reject){                             
                return setTimeout(resolve, 3000);
            });
            await tab.waitForSelector("#college", {visible : true});
            await tab.type("#college", data["College"]);
    
            await tab.waitForSelector("#start_year_chosen", {visible : true});
            await tab.click("#start_year_chosen");
            await tab.waitForSelector(".active-result[data-option-array-index='5']", {visible : true});
            await tab.click(".active-result[data-option-array-index='5']");
    
            await tab.waitForSelector("#end_year_chosen", {visible : true});
            await tab.click('#end_year_chosen');
            await tab.waitForSelector("#end_year_chosen .active-result[data-option-array-index = '6']", {visible : true});
            await tab.click("#end_year_chosen .active-result[data-option-array-index = '6']");
            
            await tab.waitForSelector("#degree", {visible : true});
            await tab.type("#degree", data["Degree"]);
    
            await new Promise(function(resolve,reject){                             
                return setTimeout(resolve, 1000);
            });
            await tab.waitForSelector("#stream", {visible : true});
            await tab.type("#stream", data["Stream"]);
    
            await new Promise(function(resolve,reject){                           
                return setTimeout(resolve, 1000);
            });
            await tab.waitForSelector("#performance-college", {visible : true});
            await tab.type("#performance-college", data["Percentage"]);
    
            await new Promise(function(resolve,reject){                              
                return setTimeout(resolve, 1000);
            });
    
            await tab.click("#college-submit");
    
        }
    
        async function senior_secondary(data){
            await tab.waitForSelector("#school_completion_status_label", {visible : true});
            if(data["intermediateStatus"]=="completed"){
                await tab.click("#school_completion_status_completed"); 
            }
            else{
                await tab.click("#school_completion_status_pursuing");
            }
        
            await tab.waitForSelector("#year_of_completion_chosen", {visible : true});
            await tab.click("#year_of_completion_chosen");
            await tab.waitForSelector(".active-result[data-option-array-index='5']", {visible : true});
            await tab.click(".active-result[data-option-array-index='5']");
            
            await tab.waitForSelector("#board", {visible : true});
            await tab.type("#board", data["board"]);
    
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
            await tab.waitForSelector("#performance-school", {visible : true});
            await tab.type("#performance-school", data["performance"]);
    
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
    
            // await tab.waitForSelector("#stream_school_chosen", {visible : true});
            // await tab.click("#stream_school_chosen");
            // await tab.waitForSelector(".active-result[data-option-array-index='1']", {visible : true});
            // await tab.click(".active-result[data-option-array-index='1']");
    
            await tab.waitForSelector("#school", {visible : true});
            await tab.type("#school", data["school"]);
    
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
    
            await tab.click("#school-submit");
    
        }
    
        // // async function secondary(data){
        // //     await tab.waitForSelector("#school_completion_status_label", {visible : true});
        // //     if(data["matriculationStatus"]=="completed"){
        // //         await tab.click("#school_completion_status_completed"); 
        // //     }
        // //     else{
        // //         await tab.click("#school_completion_status_pursuing");
        // //     }
        
        // //     await tab.waitForSelector("#year_of_completion_chosen", {visible : true});
        // //     await tab.click("#year_of_completion_chosen");
        // //     await tab.waitForSelector(".active-result[data-option-array-index='7']", {visible : true});
        // //     await tab.click(".active-result[data-option-array-index='7']");
            
        // //     await tab.waitForSelector("#board", {visible : true});
        // //     await tab.type("#board", data["board"]);
    
        // //     await new Promise(function(resolve,reject){
        // //         return setTimeout(resolve, 1000);
        // //     });
        // //     await tab.waitForSelector("#performance-school", {visible : true});
        // //     await tab.type("#performance-school", data["performance"]);
    
        // //     await new Promise(function(resolve,reject){
        // //         return setTimeout(resolve, 1000);
        // //     });
    
        // //     await tab.waitForSelector("#school", {visible : true});
        // //     await tab.type("#school", data["school"]);
    
        // //     await new Promise(function(resolve,reject){
        // //         return setTimeout(resolve, 1000);
        // //     });
    
        // //     await tab.click("#school-submit");
    
        // //     // await tab.waitForSelector(".modal-close", {visible : true});
        // //     //await tab.click(".modal-close");
    
        // // }



        async function internship(data){
            console.log("Internship Data:", data);  // Add this line to check which data is passed
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
            await tab.waitForSelector("#experience_profile", {visible : true});
            await tab.type("#experience_profile", data["profile"]);
    
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
            await tab.waitForSelector("#experience_organization", {visible : true});
            await tab.type("#experience_organization", data["organization"]);
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
    
            await tab.waitForSelector("#experience_is_work_from_home_label", {visible : true});
            await tab.click("#experience_is_work_from_home_label");
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
    
            await tab.waitForSelector('#experience_start_date', { visible: true });
            await tab.click('#experience_start_date'); // Open datepicker
            await tab.type('#experience_start_date', '2024-06-04'); // Type date in YYYY-MM-DD format
            await tab.keyboard.press('Enter');
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });

            await tab.waitForSelector('#experience_end_date', { visible: true });
            await tab.click('#experience_end_date'); // Open datepicker
            await tab.type('#experience_end_date', '2024-07-31'); // Type date in YYYY-MM-DD format
            await tab.keyboard.press('Enter');
    
            // await tab.waitForSelector("#experience-form", {visible : true});
            // await tab.type("#experience-form", data["intern_description"]);
    
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
    
            await tab.click("#internship-job-submit");
    
        }
    
    
        async function projects(data){
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 3000);
            });
            await tab.waitForSelector("#other_experiences_title", {visible : true});
            await tab.type("#other_experiences_title", data["project_title"]);
    
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
    
            await tab.waitForSelector('#other_experiences_project_start_date', { visible: true });
            await tab.click('#other_experiences_project_start_date'); // Open datepicker
            await tab.type('#other_experiences_project_start_date', '2024-07-31'); // Type date in YYYY-MM-DD format
            await tab.keyboard.press('Enter');
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
    
            await tab.waitForSelector('#other_experiences_is_on_going_label', { visible: true });
            await tab.click('#other_experiences_is_on_going_label');
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 3000);
            });
    
            await tab.waitForSelector("#project-form", {visible : true});
            await tab.type("#project-form", data["description"]);
    
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
            await tab.waitForSelector("#other_experiences_project_link", {visible : true});
            await tab.type("#other_experiences_project_link", data["link"]);
    
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
    
            await tab.click("#project-submit");
    
        }
    
    
        // // async function extraCurricular(data){
        // //     await new Promise(function(resolve,reject){
        // //         return setTimeout(resolve, 3000);
        // //     });
        // //     await tab.waitForSelector(".card-block", {visible : true});
        // //     await tab.type(".card-block", data["bgmi"]);
    
        // //     await new Promise(function(resolve,reject){
        // //         return setTimeout(resolve, 1000);
        // //     });
    
        // //     await tab.click("#por-submit");
        // // }
    
    
        async function courses(data){
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
            await tab.waitForSelector("#other_experiences_course", {visible : true});
            await tab.type("#other_experiences_course", data["courseName"]);
    
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
            await tab.waitForSelector("#other_experiences_organization", {visible : true});
            await tab.type("#other_experiences_organization", data["organization"]);
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
    
            await tab.waitForSelector("#other_experiences_location_type_label", {visible : true});
            await tab.click("#other_experiences_location_type_label");
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
    
           await tab.waitForSelector('#other_experiences_start_date', { visible: true });
            await tab.click('#other_experiences_start_date'); // Open datepicker
           // await tab.type('#other_experiences_start_date', '2024-06-04'); // Type date in YYYY-MM-DD format
            await tab.keyboard.press('Enter');
    
            await tab.waitForSelector('#other_experiences_is_on_going_label', { visible: true });
            await tab.click('#other_experiences_is_on_going_label');
            await new Promise(function(resolve,reject){
                return setTimeout(resolve, 1000);
            });
    
            await tab.click("#training-submit");
        }







                    // Application Section


        // await new Promise(function(resolve,reject){                              
        //     return setTimeout(resolve, 1000);
        // });

        // await training(dataFile[0]);

        // await new Promise(function(resolve,reject){                              
        //     return setTimeout(resolve, 1000);
        // });

        // await tab.waitForSelector(".next-button", {visible : true});
        // await tab.click(".next-button");

        // await tab.waitForSelector(".btn.btn-secondary.skip.skip-button", {visible : true});
        // await tab.click(".btn.btn-secondary.skip.skip-button");

        // await workSample(dataFile[0]);

        // await new Promise(function(resolve,reject){                              
        //     return setTimeout(resolve, 1000);
        // });

        // await tab.waitForSelector("#save_work_samples", {visible : true});
        // await tab.click("#save_work_samples");
       
 
        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 1000);
        });

        await application(dataFile[0]);

        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 1000);
        });

    // async function training(data){
    //     await tab.waitForSelector(".experiences-tabs[data-target='#training-modal'] .ic-16-plus", {visible : true});
    //     await tab.click(".experiences-tabs[data-target='#training-modal'] .ic-16-plus");

    //     await tab.waitForSelector("#other_experiences_course", {visible : true});
    //     await tab.type("#other_experiences_course", data["Training"]);

    //     await new Promise(function(resolve,reject){                             
    //         return setTimeout(resolve, 1000);
    //     });

    //     await tab.waitForSelector("#other_experiences_organization", {visible : true});
    //     await tab.type("#other_experiences_organization", data["Organization"]);

    //     await new Promise(function(resolve,reject){                             
    //         return setTimeout(resolve, 1000);
    //     });

    //     await tab.click("#other_experiences_location_type_label");

    //     await tab.click("#other_experiences_start_date");

    //     await new Promise(function(resolve,reject){                             
    //         return setTimeout(resolve, 1000);
    //     });
        
    //     await tab.waitForSelector(".ui-state-default[href='#']", {visible : true});
    //     let date = await tab.$$(".ui-state-default[href='#']");
    //     await date[0].click();
    //     await tab.click("#other_experiences_is_on_going");

    //     await tab.waitForSelector("#other_experiences_training_description", {visible : true});
    //     await tab.type("#other_experiences_training_description", data["description"]);

    //     await new Promise(function(resolve,reject){                             
    //         return setTimeout(resolve, 2000);
    //     });

    //     await tab.click("#training-submit");
        
    // }

    // async function workSample(data){
    //     await tab.waitForSelector("#other_portfolio_link", {visible : true});
    //     await tab.type("#other_portfolio_link", data["link"]);
    // }

    async function application(data){
        
        await tab.goto("https://internshala.com/internships/matching-preferences/");
        
        await new Promise(function(resolve,reject){                             
            return setTimeout(resolve, 3000);
        });
        await tab.waitForSelector(".view_detail_button", {visible : true});
        let details = await tab.$$(".view_detail_button");
        let detailUrl = [];
    
        for (let i = 4; i < Math.min(details.length, 40); i++) {  // Ensure 'i' does not exceed array length
            let url = await tab.evaluate(ele => ele.getAttribute("data-href") || "", details[i]); 
            
            if (url) { // Only add non-null URLs
                detailUrl.push(url.startsWith("http") ? url : `https://internshala.com${url}`);
            } else {
                console.warn(`Skipping invalid URL at index ${i}`);
            }
        }
        
        for(let i of detailUrl){
            await apply(i, data);
            await new Promise(function(resolve,reject){                             
                return setTimeout(resolve, 2000);
            });
        }

    }

    async function apply(url, data){
        console.log("URL passed :", url);
        await tab.goto(url);
        
        await tab.waitForSelector("#apply_now_button", {visible : true});
        await tab.click("#apply_now_button");

        await tab.waitForSelector(".proceed-btn", {visible : true});
        await tab.click(".proceed-btn");
        await new Promise(function(resolve,reject){                             
            return setTimeout(resolve, 1000);
        });
        await tab.click("#submit");
    }

}

main();