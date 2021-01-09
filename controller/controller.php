<?php 

class homeModel extends DBHandler{
    public function updateProfilePicture($pictureName)
    {
        $id = $this->get_session('userId');
        if ($this->Update("customers_auth", ['photo' => $pictureName], ['user_id' => $id])) {
            return true;
        } else {
            return false;
        }
    }

    public function updatePassword($currentPassword, $newPassword)
    {
        $id = $this->get_session('userId');
        if ($this->Select_Where("customers_auth", ['user_id' => $id])) {
            if ($this->Count() > 0) {
                $row = $this->Row();
                $dbPassword = $row->password;
                if (password_verify($currentPassword, $dbPassword)) {
                    if ($this->Update("customers_auth", ['password' => $newPassword], ['user_id' => $id])) {
                        return "success";
                    }
                } else {
                    return "currentPassworWrong";
                }
            }
        }
    }

    public function changeName($fullName)
    {
        $id = $this->get_session('userId');
        if ($this->Update("customers_auth", ['firstname' => $fullName], ['user_id' => $id])) {
            return true;
        } else {
            return false;
        }
    }


    public function getAll($table_name,$limit){

        if($this->Select($table_name)){
            if($this->AllCountLimit($table_name,$limit) > 0 ){
                return $this->AllRecords();
            } else {
                return false;
            }
        }
    }
    public function home(){
        $content = ["partners" => array(), "whoWeAre" => array(), "banner" => array(),
                    "service" => array(), "training" => array(), "testimony" => array(),
                     "product" => array(),"achievement" => array(),
                    "client" => array(), "footer" => array()];
        try {
            if($results = $this->getAllRecords("SELECT c.content, c.title, c.heading, c.prevcontent, t.content_type_name, i.image FROM content_type t, content c, image i  WHERE  t.content_type_id=c.content_type_id AND c.uid=i.reference_page_or_product AND c.active=1 ORDER BY c.created")){
            
                foreach($results as $key => $result){
                    //if($result["content_type_name"] == "partners"){
                        //array_push($content["partners"], $result);
                    //}
                    if($result["content_type_name"] == "who we are" || $result["content_type_name"] == "about"){
                        if(count($content["whoWeAre"])  == 0){
                            $content["whoWeAre"] = $result;
                        }
                    }
                    /*if($result["content_type_name"] == "service"){
                        if(count($content["service"]) != 3){
                            array_push($content["service"], $result);
                        }
                            
                    }
                    if($result["content_type_name"] == "training"){
                        if(count($content["training"]) != 3){
                            array_push($content["training"], $result);
                        }
                            
                    }*/
                }
                
            }else {
                
            }
            if($results = $this->getAllRecords("SELECT c.uid, b.banner_image, b.description, c.title, t.content_type_name FROM content c, content_type t, banner b WHERE c.uid=b.reference_page_or_product AND t.content_type_id=c.content_type_id AND c.active =1 UNION SELECT p.uid, b.banner_image, b.description, p.title, t.content_type_name FROM banner b, content_type t, product p WHERE t.content_type_id=p.content_type_id AND p.uid=b.reference_page_or_product AND p.active=1 LIMIT 4")){
                $content["banner"] = $results;
            }
            // if($results = $this->getAllRecords("SELECT t.testcontent, t.jobposition, t.stars, CONCAT_WS(' ', u.firstname, u.lastname) AS name, u.photo FROM user u INNER JOIN testimony t WHERE u.user_id=t.user_id AND t.active=1 ORDER BY t.createdDate LIMIT 4")){
            //     $content["testimony"] = $results;
            // }else {
            //     $content["testimony"] = array();
            // }
            if($results = $this->getAllRecords("SELECT p.title, p.start_date, p.end_date, p.last_enroll_date, p.seat,
             p.cost, p.description, t.review_count, t.stars, i.image, p.location 
             FROM image i INNER JOIN product p ON i.reference_page_or_product=p.uid AND p.active=1 LEFT JOIN (SELECT r.product_id, COUNT(r.stars) as review_count, 
                AVG(r.stars) as stars FROM product_review r GROUP BY r.product_id) t ON p.product_id=t.product_id ORDER BY RAND() LIMIT 8")){
            /*if($result = $this->getAllRecords("SELECT t.content_type_name as type, p.title, p.start_date, p.end_date,
                p.last_enroll_date, p.seat, p.cost, p.description, p.location , i.image FROM content_type t INNER JOIN product p 
                ON t.content_type_id=p.content_type_id AND p.active=1 LEFT JOIN  (SELECT r.product_id, COUNT(r.stars) as review_count, 
                AVG(r.stars) as stars FROM product_review r GROUP BY r.product_id) t ON p.product_id=t.product_id LEFT JOIN image i ON
                 p.uid=i.reference_page_or_product ORDER BY RAND() LIMIT 8")){*/
                $content["product"] = $results;
            }
            if($results = $this->getAllRecords("SELECT description,other,font_awesome,score FROM achievement ORDER BY RAND() LIMIT 4")){
                $content["achieve"] = $results;
            }
            // if($results = $this->getAllRecords("SELECT logo, name FROM client ORDER BY RAND() LIMIT 8")){
            //     $content["client"] = $results;
            // }

            if($partnerParent = $this->getOneRecord("SELECT c.title, c.heading, c.prevcontent, t.content_type_name as type FROM content c, content_type t WHERE t.content_type_id=c.content_type_id AND c.active=1 AND c.parent=0 AND t.content_type_name='partners'")){

                if($partner = $this->getAllRecords("SELECT c.content, c.title, c.heading, c.prevcontent, i.image FROM content_type t, content c, image i WHERE c.content_type_id = t.content_type_id AND c.parent >0 AND c.uid=i.reference_page_or_product AND c.active=1 AND t.content_type_name='partners'")){
                    $partnerParent["sub"] = $partner;
                    $content["partners"] = $partnerParent;
                }else{
                    $partnerParent["sub"] = array();
                    $content["partners"] = $partnerParent;
                }

            }
            if($trainingParent = $this->getOneRecord("SELECT c.title, c.heading FROM content c, content_type t WHERE t.content_type_id=c.content_type_id AND c.active=1 AND c.parent=0 AND t.content_type_name='training'")){
                //if($partner = $this->getAllRecords("SELECT con.content_type_id  FROM content con, content_type ti WHERE ti.content_type_id=con.content_type_id AND con.active=1 AND con.parent=0 AND ti.content_type_name='partners'")){
                if($training = $this->getAllRecords("SELECT c.title, c.heading, c.prevcontent, i.image FROM content_type t, content c, image i WHERE c.content_type_id = t.content_type_id AND c.parent >0 AND c.uid=i.reference_page_or_product AND c.active=1 AND t.content_type_name='training' LIMIT 3")){
                    $trainingParent["sub"] = $training;
                    $content["training"] = $trainingParent;
                }else{
                    $trainingParent["sub"] = array();
                    $content["training"] = $trainingParent;
                }

            }
            if($serviceParent = $this->getOneRecord("SELECT c.title, c.heading FROM content c, content_type t WHERE t.content_type_id=c.content_type_id AND c.active=1 AND c.parent=0 AND t.content_type_name='service'")){
                //if($partner = $this->getAllRecords("SELECT con.content_type_id  FROM content con, content_type ti WHERE ti.content_type_id=con.content_type_id AND con.active=1 AND con.parent=0 AND ti.content_type_name='partners'")){
                if($service = $this->getAllRecords("SELECT c.title, c.heading, c.prevcontent, i.image FROM content_type t, content c, image i WHERE c.content_type_id = t.content_type_id AND c.parent >0 AND c.uid=i.reference_page_or_product AND c.active=1 AND t.content_type_name='service' LIMIT 3")){
                    $serviceParent["sub"] = $service;
                    $content["service"] = $serviceParent;
                }else{
                    $serviceParent["sub"] = array();
                    $content["service"] = $serviceParent;
                }

            }
            if($achievement = $this->getAllRecords("SELECT a.description, a.score, a.font_awesome, c.heading as head, a.other FROM content c, achievement a WHERE a.content_id=c.uid AND c.active=1 ORDER BY DATE(c.created) LIMIT 4 ")){
                $content["achievement"] = $achievement;
            }
            return $content;
        } catch (\Throwable $th) {
            throw $th;
        }
        
    }
}
 ?>
