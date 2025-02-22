package com.updown.exercise.controller;

import com.updown.diet.dto.req.UploadDietImgReq;
import com.updown.diet.entity.DietCategory;
import com.updown.diet.entity.FoodInfo;
import com.updown.exercise.dto.req.RegsiterExerciseReq;
import com.updown.exercise.dto.req.UpdateExerciseReq;
import com.updown.exercise.dto.req.UploadExerciseImgReq;
import com.updown.exercise.dto.res.SearchExerciseInfo;
import com.updown.exercise.dto.res.SearchExerciseListRes;
import com.updown.exercise.dto.res.SearchExerciseRes;
import com.updown.exercise.entity.ExerciseInfo;
import com.updown.exercise.service.ExerciseService;
import com.updown.member.entity.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exercise")
public class ExerciseController {
    private final ExerciseService exerciseService;

    /**
     * 운동 등록
     * @param regDate
     * @param member
     * @param regsiterExerciseReq
     * @return
     */
    @PostMapping ("/{regDate}")
    ResponseEntity<?> registerExercise(@PathVariable("regDate") LocalDate regDate, @AuthenticationPrincipal Member member, @RequestBody RegsiterExerciseReq regsiterExerciseReq) {
        exerciseService.registerExercise(regDate, member, regsiterExerciseReq);
        return ResponseEntity.ok().build();
    }

    /**
     * 하루 운동 정보 조회
     * @param regDate
     * @param member
     * @return
     */
    @GetMapping("/{regDate}")
    ResponseEntity<?> searchExercise(@PathVariable("regDate") LocalDate regDate, @AuthenticationPrincipal Member member){
        SearchExerciseRes searchExerciseRes = exerciseService.searchExercise(regDate, member);
        return ResponseEntity.ok().body(searchExerciseRes);
    }

    /**
     * 하루 운동 리스트 조회
     * @param regDate
     * @param member
     * @return
     */
    @GetMapping("/list/{regDate}")
    ResponseEntity<?> searchExerciseList(@PathVariable("regDate") LocalDate regDate, @AuthenticationPrincipal Member member){
        SearchExerciseListRes searchExerciseListRes = exerciseService.searchExerciseList(regDate,member);
        return ResponseEntity.ok().body(searchExerciseListRes);
    }

    /**
     * 운동 수정
     * @param exerciseId
     * @param member
     * @param updateExercise
     * @return
     */
    @PutMapping("/{exerciseId}")
    ResponseEntity<?> updateExercise(@PathVariable("exerciseId") Integer exerciseId, @AuthenticationPrincipal Member member, @RequestBody UpdateExerciseReq updateExercise){
        exerciseService.updateExercise(exerciseId, member, updateExercise);
        return ResponseEntity.ok().build();
    }

    /**
     * 운동 삭제
     * @param exerciseId
     * @param member
     * @return
     */
    @DeleteMapping("/{exerciseId}")
    ResponseEntity<?> deleteExercise(@PathVariable("exerciseId") Integer exerciseId, @AuthenticationPrincipal Member member){
        exerciseService.deleteExercise(exerciseId, member);
        return ResponseEntity.ok().build();
    }

    /**
     * 운동 이미지 업로드
     * @param member
     * @param uploadExerciseImgReq
     * @return
     */
    @Transactional
    @PostMapping("/img")
    public ResponseEntity<?> uploadDietImg(@AuthenticationPrincipal Member member, @ModelAttribute UploadExerciseImgReq uploadExerciseImgReq){
        System.out.println("운동업로드 로직 시작");
        exerciseService.uploadExerciseImg(member, uploadExerciseImgReq);
        return ResponseEntity.ok().build();
    }

    /**
     * 운동 사진 삭제
     * @param exerciseRecordId
     * @param member
     * @return
     */
    @Transactional
    @DeleteMapping("/img/{exerciseRecordId}")
    public ResponseEntity<?> deleteDietImage(@PathVariable Integer exerciseRecordId, @AuthenticationPrincipal Member member) {
        exerciseService.deleteExerciseImg(exerciseRecordId, member);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchExerciseInfo(@AuthenticationPrincipal Member member, @RequestParam String searchStr, @RequestParam LocalDate regDate){
        SearchExerciseInfo searchExerciseInfo = exerciseService.searchExerciseInfo(member, searchStr, regDate);

        if(!searchExerciseInfo.getExerciseInfoList().isEmpty()){
            return ResponseEntity.ok(searchExerciseInfo);
        }
        return ResponseEntity.noContent().build();
    }
}
